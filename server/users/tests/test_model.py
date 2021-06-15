from django.test import TestCase
from django.contrib.auth import get_user_model


class UserAccountTests(TestCase):

    def test_new_superuser(self):
        user_model = get_user_model()
        super_user = user_model.objects.create_superuser(
            'username', 'testuser@super.com', 'firstname', 'lastname', 'password')
        self.assertEqual(super_user.email, 'testuser@super.com')
        self.assertEqual(super_user.last_name, 'lastname')
        self.assertEqual(super_user.username, 'username')
        self.assertEqual(super_user.first_name, 'firstname')
        self.assertTrue(super_user.is_superuser)
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user.is_active)
        self.assertEqual(super_user.account_type, 4)
        self.assertEqual(str(super_user), "username")

        with self.assertRaises(ValueError):
            user_model.objects.create_superuser(
                email='testuser@super.com', username='username1', first_name='first_name',
                last_name='last_name', password='password', is_superuser=False)

        with self.assertRaises(ValueError):
            user_model.objects.create_superuser(
                email='testuser@super.com', username='username1', first_name='first_name',
                last_name='last_name', password='password', is_staff=False)

        with self.assertRaises(ValueError):
            user_model.objects.create_superuser(
                email='',
                username='username1',
                first_name='first_name',
                last_name='last_name',
                password='password',
                is_superuser=True)

        with self.assertRaises(ValueError):
            user_model.objects.create_superuser(
                email='testuser@super.com',
                username='',
                first_name='first_name',
                last_name='last_name',
                password='password',
                is_superuser=True
            )
        with self.assertRaises(ValueError):
            user_model.objects.create_superuser(
                email='testuser@super.com', username='username1', first_name='first_name',
                last_name='last_name',
                password='password', account_type=1)

    def test_new_user(self):
        user_model = get_user_model()
        user = user_model.objects.create_user(
            'username', 'testuser@user.com', 'firstname', 'lastname', 'password', account_type=1)
        self.assertEqual(user.email, 'testuser@user.com')
        self.assertEqual(user.username, 'username')
        self.assertEqual(user.first_name, 'firstname')
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)
        self.assertEqual(user.get_full_name(), 'firstname lastname')

        with self.assertRaises(ValueError):
            user_model.objects.create_user(
                email='', username='a', first_name='first_name',
                last_name='last_name', password='password')
