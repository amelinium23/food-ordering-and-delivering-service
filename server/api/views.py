import django
from datetime import timedelta
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.http import Http404
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Restaurant, MenuGroup, Order, Dish, OrderedDish, Extra, OrderedExtra
from users.models import DeliveryManData, User, RestaurantOwner
from users.serializers import DeliveryManDataSerializer
from api.serializers import RestaurantSerializer, MenuGroupSerializer, OrderSerializer
from api.permissions import IsRestaurantOwnerOrReadOnly, IsRestaurantOwner, IsDeliveryForOrder, IsDeliveryAccountOwner, IsRestaurantOwnerForOrder, IsNormalUser


class RestaurantList(generics.ListCreateAPIView):
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


class RestaurantDetailsForOrder(APIView):
    """
    Retrieve a restaurant details through order.
    """

    def get_object(self, pk):
        try:
            order = Order.objects.get(pk=pk)
            return order.restaurant
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)


class RestaurantMenu(APIView):
    """
    Retrieve a restaurant menu.
    """

    def get_object(self, pk):
        try:
            return MenuGroup.objects.get(restaurant=pk)
        except MenuGroup.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        menugroup = self.get_object(pk)
        serializer = MenuGroupSerializer(menugroup)
        return Response(serializer.data)


class OrderHistory(APIView):
    """
    Retrive an order history for user.
    """

    def get(self, request, user_id):
        if request.user.account_type == 3:
            restaurant = RestaurantOwner.objects.get(
                user=request.user.id).restaurant
            orders = Order.objects.filter(restaurant=restaurant, status__gt=4)
        else:
            orders = Order.objects.filter(user=user_id)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderPlacement(APIView):
    """
    Post an order.
    """
    permission_classes = [
        permissions.IsAuthenticated & IsNormalUser]

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
    """
    Retrieve or patch(only for deliveryMan or restaurantOwner) an order details
    """
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
        if request.user.account_type == 2:
            data_to_edit = {'status': request.data["status"], 'delivery': request.data["delivery"]}
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
    permission_classes = [permissions.IsAuthenticated & IsDeliveryAccountOwner]

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
    """
    Delivery man gets eligible orders
    """
    permission_classes = [permissions.IsAuthenticated, IsDeliveryAccountOwner]

    def get(self, request):
        orders = Order.objects.filter(delivery=request.user.id, status=2)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrdersForRestaurant(APIView):
    """
    Restaurant gets eligible orders
    """
    permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]

    def get(self, request, format=None):
        restaurant = RestaurantOwner.objects.get(
            user=request.user.id).restaurant
        orders = Order.objects.filter(restaurant=restaurant, status__lt=4)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class AvailableDeliveries(APIView):
    """
    Restaurant gets eligible deliveryMans
    """
    permission_classes = [permissions.IsAuthenticated, IsRestaurantOwner]

    def get(self, request, format=None):
        restaurant_location = request.user.restaurantowner.restaurant.location
        five_minutes_ago = django.utils.timezone.now() + timedelta(minutes=-5)
        queryset = DeliveryManData.objects.filter(
            status=1, last_online__gte=five_minutes_ago).annotate(distance=Distance(
                restaurant_location, 'location')).order_by('distance').filter(distance__lte=5000)
        serializer = DeliveryManDataSerializer(queryset, many=True)
        return Response(serializer.data)
