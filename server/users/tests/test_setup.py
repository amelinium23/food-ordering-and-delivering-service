from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetup(APITestCase):

    def setUp(self):
        #self.auth_url = reverse('users:auth/login')
        # self.login_url = reverse('users:auth/login')
        # self.register_url = reverse('users:registration')
        # self.social_login_url = reverse('users:social-login')

        self.user_data = {
            'username': 'user',
            'email': 'example@gmail.com',
            'first_name': 'foo',
            'last_name': 'bar',
            'password': 'hardpassword',
            'password2': 'hardpassword'
        }

        self.invalid_data = {
            'username': 'user',
            'email': 'example@gmail.com',
            'first_name': 'foo',
            'last_name': 'bar',
            'password': 'foobar',
            'password2': 'foobar'
        }

        self.login_data = {
            'username': 'user',
            'email': 'example@gmail.com',
            'password': 'hardpassword',
        }

        self.invalid_login_data = {
            'username': 'user',
            'email': 'example@gmail.com',
            'password': 'hardpasswor',
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
