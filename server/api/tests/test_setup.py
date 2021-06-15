import json
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.contrib.gis.geos import Point
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Restaurant, MenuGroup, Dish, OpeningHour


class TestSetup(APITestCase):

    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            'normal_user', 'testuser@user.com', 'firstname', 'lastname', 'password', account_type=1)
        self.delivery_user = user_model.objects.create_user(
            'delivery_user', 'example@user.com', 'firstname', 'lastname', 'password', account_type=22)
        self.restaurant_user = user_model.objects.create_user(
            'restaurant_user', 'foo@bar.com', 'firstname', 'lastname', 'password', account_type=3)
        self.user_token = self.get_tokens_for_user(self.user)['access']
        self.delivery_user_token = self.get_tokens_for_user(self.delivery_user)[
            'access']
        self.restaurant_user_token = self.get_tokens_for_user(self.restaurant_user)[
            'access']
        self.restaurants_url = reverse('api:restaurants')
        # self.specific_restaurants_url = reverse('api:restaurantDetails')
        self.orders_url = reverse('api:orders')
        # self.orders_url = reverse('delivery-orders')
        # self.update_status_url = reverse('update-status')
        # self.restaurant_orders_url = reverse('restaurant-orders')
        # self.restaurant_order_history_url = reverse('restaurant-order-history')
        # self.avaiable_delivery_men_url = reverse('available-delivery-men')

        location = Point(0, 0, srid=4326)
        self.test_restaurant = Restaurant.objects.create(
            name='restauracja', logo='https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png', address='adres', location=location, delivery_cost=10)

        self.test_opening_hour = OpeningHour.objects.create(
            weekday=1, restaurant=self.test_restaurant, opening_hour="10:00", closing_hour="20:00")

        self.test_menu_group = MenuGroup.objects.create(
            restaurant=self.test_restaurant, name='pizza')

        self.test_dish = Dish.objects.create(
            group=self.test_menu_group, name='hawajska', image='https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png', price=21.37)

        self.test_order = json.dumps({
            "restaurantId": self.test_restaurant.id, "orderedItems": [{'dishId': self.test_dish.id, 'orderedExtras': []}, {'dishId': self.test_dish.id, 'orderedExtras': []}], "orderCost": 85.25, "deliveryAddress": "Mniam"
        })

        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    def user_authentication(self, user):
        if user == 1:
            token = self.user_token
        elif user == 2:
            token = self.delivery_user_token
        elif user == 3:
            token = self.restaurant_user_token
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + token)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
