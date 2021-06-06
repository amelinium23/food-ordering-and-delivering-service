from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate, APITestCase
from models import Restaurant


# class RestaurantTests(APITestCase):
#    def test_get_restaurant(self):
#       """
#       Getting restaurant details
#       """

