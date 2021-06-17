from .test_setup import TestSetup
from api.models import CuisineType, OpeningHour, MenuGroup, Dish, ExtraGroup


class ApiModelsTests(TestSetup):

    def test_cuisine_type_create(self):
        test_cuisine_type = CuisineType.objects.create(name='Chińska')
        self.assertEqual(str(test_cuisine_type), "Chińska")

    def test_opening_hour_create(self):
        test_opening_hour = OpeningHour.objects.create(
            weekday=0, restaurant=self.test_restaurant, opening_hour=self.test_opening_hour, closing_hour=self.test_closing_hour)
        self.assertEqual(str(test_opening_hour), "restauracja - 0")

    def test_menu_group_create(self):
        test_menu_group = MenuGroup.objects.create(
            restaurant=self.test_restaurant, name="Napoje")
        self.assertEqual(str(test_menu_group), "Napoje - restuaracja - adres")

    def test_dish_create(self):
        test_dish = Dish.objects.create(group=self.test_menu_group, name="hawajska",
        image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg", price=37.99)
        self.assertEqual(str(test_dish), "pizza - restauracja - adres - hawajska")

    def test_extra_group_create(self):
        test_extra_group = ExtraGroup.objects.create(dish=self.test_dish, name="ketchup", extra_type=1)
        self.assertEqual(str(test_extra_group),
                         "pizza - restauracja - adres - hawajska - ketchup")

    def test_extra_create(self):
        pass

    def test_order_create(self):
        pass

    def test_ordered_dish_create(self):
        pass

    def test_ordered_extra_create(self):
        pass

    def test_restaurant_create(self):
        pass
