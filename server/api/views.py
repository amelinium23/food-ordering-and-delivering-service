from datetime import datetime
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.http import Http404, HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Restaurant, MenuGroup, Order, Dish, OrderedDish, Extra, OrderedExtra, OpeningHour
from api.serializers import RestaurantSerializer, MenuGroupSerializer, OrderSerializer

# Create your views here.


def index(request):
    print(datetime.today().weekday())
    return HttpResponse("co jest????")


class RestaurantList(generics.ListCreateAPIView):
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

    def get_object(self, pk):
        try:
            return Restaurant.objects.get(pk=pk)
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

    def get_object(self, pk):
        try:
            return MenuGroup.objects.get(restaurant=pk)
        except Restaurant.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        menugroup = self.get_object(pk)
        serializer = MenuGroupSerializer(menugroup)
        return Response(serializer.data)


class OrderHistory(APIView):
    def get(self, request, user_id):
        orders = Order.objects.filter(user=user_id)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetails(APIView):
    # Co tutaj sie dzieje nie wiem, stabilne to jak moje zdrowie psychiczne
    # Serio, jak to da sie lepiej zrobic to slucham, czemu nie mozna commit=False dawac ;-;
    def post(self, request):
        restaurant = Restaurant.objects.get(pk=request.data['restaurantId'])
        ordered_extras = []
        order = Order(user=request.user, restaurant=restaurant,
                      order_cost=request.data['orderCost'])
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

    def get_object(self, pk):
        try:
            return OrderDetails.objects.get(order=pk)
        except Order.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, pk):
        order = self.get_object(pk)
        serializer = OrderSerializer(
            order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DeliveryManStatus(APIView):
#     def get_object(self, pk):
#         try:
#             return OrderDetails.objects.get(DeliveryMan=pk)
#         except De.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         order = self.get_object(pk)
#         serializer = OrderSerializer(order)
#         return Response(serializer.data)
