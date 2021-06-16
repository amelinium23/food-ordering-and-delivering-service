import json
from .test_setup import TestSetup

class TestRestaurantViewCase(TestSetup):
    def test_user_cannot_get_restaurant_list_without_authorization(self):
        response = self.client.get(self.restaurants_url)
        self.assertEqual(response.status_code, 401)

    def test_user_can_get_restaurant_list_with_authorization(self):
        self.user_authentication(1)
        response = self.client.get(self.restaurants_url)
        self.assertEqual(response.status_code, 200)
        response = self.client.get(
            '/api/restaurants/', {'longitude': 0, 'latitude': 0})
        self.assertEqual(response.status_code, 200)

    def test_user_can_get_spefic_restaurant_details(self):
        self.user_authentication(1)
        response = self.client.get(self.specific_restaurant_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], self.test_restaurant.name)
        self.assertEqual(response.data["address"],
                         self.test_restaurant.address)

    def test_restaurant_user_can_patch_restaurant_details(self):
        self.user_authentication(3)
        response = self.client.patch(
            self.specific_restaurant_url, {'delivery_cost': 5})
        self.assertEqual(response.status_code, 200)
        response = self.client.patch(
            self.specific_restaurant_url, {'delivery_cost': "foobar"})
        self.assertEqual(response.status_code, 400)

    def test_user_cannot_get_not_exisiting_restaurant_details(self):
        self.user_authentication(1)
        response = self.client.get(self.invalid_specific_restaurant_url)
        self.assertEqual(response.status_code, 404)

    def test_user_can_get_restaurant_menu(self):
        self.user_authentication(1)
        response = self.client.get(self.restaurant_menu_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], self.test_menu_group.name)

    def test_user_cannot_get_not_existing_restaurant_menu_(self):
        self.user_authentication(1)
        response = self.client.get(self.invalid_restaurant_menu_url)
        self.assertEqual(response.status_code, 404)


class TestOrderViewCase(TestSetup):
    def test_normal_user_can_retrieve_order_history(self):
        self.user_authentication(1)
        self.client.post(self.orders_url, self.test_post_order,
                         content_type='application/json')
        response = self.client.get(self.user_order_history_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["user"]["username"], "normal_user")
        self.assertEqual(response.data[0]["status"], 1)
        self.assertEqual(response.data[0]["delivery_address"], 'address')
        self.assertEqual(
            response.data[0]["restaurant"], self.test_restaurant.name)
        self.assertEqual(response.data[0]["order_cost"], 10.00)

    def test_restaurant_user_can_retrieve_order_history(self):
        self.user_authentication(3)
        self.client.post(self.orders_url, self.test_post_order,
                         content_type='application/json')
        response = self.client.get(self.user_order_history_url)
        self.assertEqual(response.status_code, 200)

    def test_normal_user_can_post_order(self):
        self.user_authentication(1)
        response = self.client.post(
            self.orders_url, self.test_post_order, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_delivery_user_cannot_post_order(self):
        self.user_authentication(2)
        response = self.client.post(
            self.orders_url, self.test_post_order, content_type='application/json')
        self.assertEqual(response.status_code, 403)

    def test_restaurant_user_cannot_post_order(self):
        self.user_authentication(3)
        response = self.client.post(
            self.orders_url, self.test_post_order, content_type='application/json')
        self.assertEqual(response.status_code, 403)

    def test_user_can_get_specific_order_details(self):
        self.user_authentication(1)
        response = self.client.get(self.order_details_url)
        self.assertEqual(response.status_code, 200)

    def test_user_cannot_get_not_existing_order_details(self):
        self.user_authentication(1)
        response = self.client.get(self.invalid_order_details_url)
        self.assertEqual(response.status_code, 404)

    def test_user_cannot_patch_specific_order_details(self):
        self.user_authentication(1)
        response = self.client.patch(
            self.specific_restaurant_url, {'delivery_cost': "wrong_example"})
        self.assertEqual(response.status_code, 403)

    def test_restaurant_user_can_patch_specific_order_details(self):
        self.user_authentication(3)
        response = self.client.patch(
            self.order_details_url, {'deliveryAddress': "other_address"})
        self.assertEqual(response.status_code, 200)

    def test_restaurant_user_cannot_patch_invalid_order_details(self):
        self.user_authentication(3)
        response = self.client.patch(
            self.order_details_url, {'status': 7})
        self.assertEqual(response.status_code, 400)

    def test_delivery_user_can_patch_order_details(self):
        self.user_authentication(2)
        response = self.client.patch(
            self.order_details_url, self.test_order_details, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_delivery_user_can_patch_his_status(self):
        self.user_authentication(2)
        response = self.client.patch(
            self.update_delivery_man_status_url, {'last_online': "2011-10-05T14: 48: 00.000Z"})
        self.assertEqual(response.status_code, 200)

    def test_delivery_user_cannot_patch_invalid_request(self):
        self.user_authentication(2)
        response = self.client.patch(
            self.update_delivery_man_status_url, {'location': "wrong_example"})
        self.assertEqual(response.status_code, 400)

    def test_delivery_user_does_not_exist(self):
        self.user_authentication()
        response = self.client.patch(
            self.update_delivery_man_status_url, {'last_online': "2011-10-05T14: 48: 00.000Z"})
        self.assertEqual(response.status_code, 404)

    def test_delivery_user_can_get_his_orders(self):
        self.user_authentication(2)
        response = self.client.get(self.orders_for_delivery_man_url)
        self.assertEquals(response.status_code, 200)
    
    def test_restaurant_user_can_get_orders(self):
        self.user_authentication(3)
        response = self.client.get(self.orders_for_restaurant_url)
        self.assertEquals(response.status_code, 200)

    def test_restaurant_user_can_get_available_delivery_man(self):
        self.user_authentication(3)
        response = self.client.get(self.available_delivery_man_url)
        self.assertEquals(response.status_code, 200)

    def test_user_can_get_restaurant_details_from_order(self):
        self.user_authentication(1)
        response = self.client.get(self.restaurant_details_from_order_url)
        self.assertEqual(response.status_code, 200)
    
    def test_user_cannot_get_restaurant_details_from_invalid_order(self):
        self.user_authentication(1)
        response = self.client.get(self.restaurant_details_from_invalid_order_url)
        self.assertEqual(response.status_code, 404)
