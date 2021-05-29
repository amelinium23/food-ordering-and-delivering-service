from datetime import datetime

from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Restaurant, MenuGroup, Order
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
