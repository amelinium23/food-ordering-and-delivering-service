import json
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.contrib.gis.geos import Point
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Restaurant, MenuGroup, Dish, OpeningHour, Order
from users.models import RestaurantOwner, DeliveryManData


class TestSetup(APITestCase):

    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            'normal_user', 'testuser@user.com', 'firstname', 'lastname', 'password', account_type=1)
        self.delivery_user = user_model.objects.create_user(
            'delivery_user', 'example@user.com', 'firstname', 'lastname', 'password', account_type=2)
        self.invalid_delivery_user = user_model.objects.create_user(
            'invalid_delivery_user', 'invalid@user.com', 'firstname', 'lastname', 'password', account_type=2)
        self.restaurant_user = user_model.objects.create_user(
            'restaurant_user', 'foo@bar.com', 'firstname', 'lastname', 'password', account_type=3)

        self.user_token = self.get_tokens_for_user(self.user)['access']
        self.delivery_user_token = self.get_tokens_for_user(self.delivery_user)[
            'access']
        self.restaurant_user_token = self.get_tokens_for_user(self.restaurant_user)[
            'access']
        self.invalid_delivery_user_token = self.get_tokens_for_user(self.invalid_delivery_user)['access']

        location = Point(0, 0, srid=4326)
        self.test_restaurant = Restaurant.objects.create(
            name='restauracja', logo='https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png', address='adres', location=location, delivery_cost=10)

        self.restaurant_owner = RestaurantOwner.objects.create(
            user=self.restaurant_user, restaurant=self.test_restaurant)

        self.delivery_man = DeliveryManData.objects.create(
            status=1, user=self.delivery_user, location=location, last_online="2020-10-05T14: 48: 00.000Z")

        self.test_opening_hour = OpeningHour.objects.create(
            weekday=1, restaurant=self.test_restaurant, opening_hour="10:00", closing_hour="20:00")

        self.test_menu_group = MenuGroup.objects.create(
            restaurant=self.test_restaurant, name='pizza')

        self.test_dish = Dish.objects.create(
            group=self.test_menu_group, name='hawajska', image='https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png', price=21.37)

        self.test_order = Order.objects.create(
            user=self.user, restaurant=self.test_restaurant, delivery=self.delivery_user, order_cost=10, delivery_address='address')

        self.test_post_order = json.dumps({
            "restaurantId": self.test_restaurant.id, "orderedItems": [{'dishId': self.test_dish.id, 'orderedExtras': []}, {'dishId': self.test_dish.id, 'orderedExtras': []}], "orderCost": 85.25, "deliveryAddress": "Mniam"
        })

        self.restaurants_url = reverse('api:restaurants')
        self.specific_restaurant_url = reverse('api:restaurantDetails', kwargs={
            "pk": self.test_restaurant.id})
        self.invalid_specific_restaurant_url = reverse('api:restaurantDetails', kwargs={
            "pk": 99999})
        self.restaurant_menu_url = reverse('api:restaurantMenu', kwargs={
                                           "pk": self.test_restaurant.id})
        self.invalid_restaurant_menu_url = reverse('api:restaurantMenu', kwargs={
            "pk": 99999})
        self.user_order_history_url = reverse(
            'api:userOrderHistory', kwargs={"user_id": self.user.id})
        self.orders_url = reverse('api:orders')
        self.order_details_url = reverse('api:orderDetails', kwargs={
            "pk": self.test_order.id})
        self.invalid_order_details_url = reverse('api:orderDetails', kwargs={
            "pk": 99999})
        self.orders_for_delivery_man_ulr = reverse('api:deliveryManOrders')
        # self.restaurant_orders_url = reverse('restaurant-orders')
        # self.restaurant_order_history_url = reverse('restaurant-order-history')
        # self.avaiable_delivery_men_url = reverse('available-delivery-men')

        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    def user_authentication(self, userid=99):
        if userid == 1:
            token = self.user_token
        elif userid == 2:
            token = self.delivery_user_token
        elif userid == 3:
            token = self.restaurant_user_token
        else:
            token = self.invalid_delivery_user_token
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + token)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
