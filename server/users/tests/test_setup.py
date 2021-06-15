from rest_framework.test import APITestCase


class TestSetup(APITestCase):

    def setUp(self):
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
