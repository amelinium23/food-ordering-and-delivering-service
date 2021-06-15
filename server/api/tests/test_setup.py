from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken


class TestSetup(APITestCase):

    def setUp(self):
        self.restaurants_url = reverse('api:restaurants')
        # self.specific_restaurants_url = reverse('api:restaurantDetails')
        # self.order_history_url = reverse('orders')
        # self.orders_url = reverse('delivery-orders')
        # self.update_status_url = reverse('update-status')
        # self.restaurant_orders_url = reverse('restaurant-orders')
        # self.restaurant_order_history_url = reverse('restaurant-order-history')
        # self.avaiable_delivery_men_url = reverse('available-delivery-men')

        default_user = {
            'username': 'user',
            'email': 'example@gmail.com',
            'firstname': 'foo',
            'lastname': 'bar',
            'password': 'hardpassword'
        }

        return super().setUp()

    def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def tearDown(self):
        return super().tearDown()
