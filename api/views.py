from datetime import datetime, timedelta
import django
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.http import Http404, HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Restaurant, MenuGroup, Order, Dish, OrderedDish, Extra, OrderedExtra, OpeningHour
from users.models import DeliveryManData, User, RestaurantOwner
from users.serializers import DeliveryManDataSerializer
from api.serializers import RestaurantSerializer, MenuGroupSerializer, OrderSerializer
from rest_framework import permissions
from api.permissions import IsRestaurantOwnerOrReadOnly, IsRestaurantOwner, IsDeliveryForOrder, IsDeliveryAccountOwner, IsRestaurantOwnerForOrder


def index(request):
    print(datetime.today().weekday())
    return HttpResponse("co jest????")


class RestaurantList(generics.ListAPIView):
    """
    Retrieve available restaurant list.
    """
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.are_open()
        try:
            longitude = float(self.request.query_params.get('longitude', None))
            latitude = float(self.request.query_params.get('latitude', None))
        except:
            return queryset
        else:
            user_location = Point(longitude, latitude, srid=4326)
            return queryset.annotate(distance=Distance('location', user_location)).order_by('distance')


class RestaurantDetails(APIView):
    """
    Retrieve or update(delivery_cost) a restaurant instance.
    """
    permission_classes = [permissions.IsAuthenticated,
                          IsRestaurantOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            restaurant = Restaurant.objects.get(pk=pk)
            self.check_object_permissions(self.request, restaurant)
            return restaurant
        except Restaurant.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    def patch(self, request, pk):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(
            restaurant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RestaurantMenu(APIView):
    """
    Retrieve a restaurant menu.
    """

    def get(self, request, pk, format=None):
        menugroup = MenuGroup.objects.filter(restaurant=pk)
        serializer = MenuGroupSerializer(menugroup, many=True)
        return Response(serializer.data)


class OrderHistory(APIView):
    def get(self, request, user_id):
        orders = Order.objects.filter(user=user_id)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)



class OrderPlacement(APIView):
    """
    Retrieve an order details, post an order, update order status.
    """
    # Co tutaj sie dzieje nie wiem, stabilne to jak moje zdrowie psychiczne
    # Serio, jak to da sie lepiej zrobic to slucham, czemu nie mozna commit=False dawac ;-;
    permission_classes = [permissions.IsAuthenticated,
                          IsRestaurantOwnerForOrder | IsDeliveryForOrder]

    def post(self, request):
        restaurant = Restaurant.objects.get(pk=request.data['restaurantId'])
        ordered_extras = []
        order = Order(user=request.user, restaurant=restaurant,
                      order_cost=request.data['orderCost'], delivery_address=request.data['deliveryAddress'])
        order.save()
        for dish in request.data['orderedItems']:
            ordered_dish = Dish.objects.get(pk=dish['dishId'])
            ordered_dish_instance = OrderedDish(dish=ordered_dish, order=order)
            ordered_dish_instance.save()
            ordered_extras.extend(list(map(lambda x, d=ordered_dish_instance: OrderedExtra(
                extra=Extra.objects.get(pk=x), dish=d), dish['orderedExtras'])))
        OrderedExtra.objects.bulk_create(ordered_extras)
        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderDetails(APIView):
    permission_classes = [
        IsRestaurantOwnerForOrder | IsDeliveryForOrder]

    def get_object(self, pk):
        try:
            order = Order.objects.get(pk=pk)
            self.check_object_permissions(self.request, order)
            return order
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, pk):
        order = self.get_object(pk)
        if request.user.account_type == 2 and order.delivery == request.user.id:
            data_to_edit = {'status': request.data.get(
                'status'), 'delivery': request.data.get('delivery')}
            serializer = OrderSerializer(
                order, data=data_to_edit, partial=True)
        else:
            serializer = OrderSerializer(
                order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeliveryManStatus(APIView):
    """
    Delivery man updates his status (to be visible to restaurants)
    """
    permission_classes = [permissions.IsAuthenticated, IsDeliveryAccountOwner]

    def patch(self, request):
        delivery_man = self.get_object(request.user.id)
        serializer = DeliveryManDataSerializer(
            delivery_man, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk).deliverymandata
        except DeliveryManData.DoesNotExist:
            raise Http404


class OrdersForDeliveryMan(APIView):
    permission_classes = [permissions.IsAuthenticated, IsDeliveryAccountOwner]

    def get(self, request):
        orders = Order.objects.filter(delivery=request.user.id, status=2)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrdersForRestaurant(APIView):
    permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]

    def get(self, request, format=None):
        restaurant = RestaurantOwner.objects.get(
            user=request.user.id).restaurant
        orders = Order.objects.filter(restaurant=restaurant, status__lte=4)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class RestaurantOrderHistory(APIView):
    permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]

    def get(self, request, format=None):
        restaurant = RestaurantOwner.objects.get(
            user=request.user.id).restaurant
        orders = Order.objects.filter(restaurant=restaurant, status__gt=4)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class AvailableDeliveries(APIView):
    permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]

    def get(self, request, format=None):
        restaurant_location = request.user.restaurantowner.restaurant.location
        five_minutes_ago = django.utils.timezone.now() + timedelta(minutes=-5)
        queryset = DeliveryManData.objects.filter(
            status=1, last_online__gte=five_minutes_ago).annotate(distance=Distance(
                restaurant_location, 'location')).order_by('distance').filter(distance__lte=5000)
        serializer = DeliveryManDataSerializer(queryset, many=True)
        return Response(serializer.data)
