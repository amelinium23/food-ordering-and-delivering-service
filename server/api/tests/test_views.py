from .test_setup import TestSetup

class TestViews(TestSetup):
   def test_get_restaurants_list_without_authorization(self):
      response = self.client.get(self.restaurants_url)
      self.assertEqual(response.status_code, 401)
