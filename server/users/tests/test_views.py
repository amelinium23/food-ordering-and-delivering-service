from django.http import response
from .test_setup import TestSetup


class TestRegisterViewCase(TestSetup):

    def test_user_cannot_register_with_no_data(self):
        response = self.client.post('/users/registration/', {})
        self.assertEqual(response.status_code, 400)

    def test_user_can_register(self):
        response = self.client.post('/users/registration/', self.user_data)
        self.assertEqual(response.status_code, 201)

    def test_user_cannot_register_with_same_email(self):
        self.client.post('/users/registration/', self.user_data)
        response = self.client.post('/users/registration/', self.user_data)
        self.assertEqual(response.status_code, 400)

class TestLoginViewCase(TestSetup):

    def test_user_cannot_login_with_invalid_data(self):
        self.client.post('/users/registration/', self.user_data)
        response = self.client.post('/users/auth/login/', self.invalid_login_data)
        self.assertEqual(response.status_code, 400)

    def test_user_can_login(self):
        self.client.post('/users/registration/', self.user_data)
        response = self.client.post('/users/auth/login/', self.login_data)
        self.assertEqual(response.status_code, 200)