from django.test import TestCase
from api.models import CuisineType

class ApiModelsTests(TestCase):
   def test_cuisine_type_create(self):
      test_cuisine_type = CuisineType.objects.create(name='Chińska')
      self.assertEqual(test_cuisine_type.str, "<CuisineType: Chińska>")
