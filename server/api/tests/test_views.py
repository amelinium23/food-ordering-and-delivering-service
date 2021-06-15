from .test_setup import TestSetup


class TestRestaurantViewCase(TestSetup):
    def test_user_cannot_get_restaurant_list_without_authorization(self):
        response = self.client.get(self.restaurants_url)
        self.assertEqual(response.status_code, 401)

    def test_user_can_get_restaurant_list_with_authorization(self):
        self.user_authentication(1)
        response = self.client.get(self.restaurants_url)
        self.assertEqual(response.status_code, 200)


class TestOrderViewCase(TestSetup):
    def test_normal_user_can_post_order(self):
        self.user_authentication(1)
        response = self.client.post(
            self.orders_url, self.test_order, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_delivery_user_cannot_post_order(self):
        self.user_authentication(2)
        response = self.client.post(
            self.orders_url, self.test_order, content_type='application/json')
        self.assertEqual(response.status_code, 403)
