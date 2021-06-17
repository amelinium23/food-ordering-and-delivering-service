from .test_setup import TestSetup
from api.models import CuisineType, OpeningHour, MenuGroup, Dish, ExtraGroup, Extra, Order, OrderedDish, OrderedExtra


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
        self.assertEqual(str(test_menu_group), "Napoje - restauracja - adres")

    def test_dish_create(self):
        test_dish = Dish.objects.create(group=self.test_menu_group, name="hawajska",
                                        image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg", price=37.99)
        self.assertEqual(
            str(test_dish), "pizza - restauracja - adres - hawajska")

    def test_extra_group_create(self):
        test_extra_group = ExtraGroup.objects.create(
            dish=self.test_dish, name="sosy", extra_type=1)
        self.assertEqual(str(test_extra_group),
                         "pizza - restauracja - adres - hawajska - sosy")

    def test_extra_create(self):
        test_extra = Extra.objects.create(
            category=self.test_extra_group, name="ketchup", added_price=2.00)
        self.assertEqual(
            str(test_extra), "ketchup - 2.0")

    def test_order_create(self):
        test_order = Order.objects.create(
            user=self.user, restaurant=self.test_restaurant, delivery=self.delivery_user, order_cost=10, delivery_address='address')
        test_order.save()
        test_order_placement_date = Order.objects.get(
            pk=test_order.pk).order_placement_date
        self.assertEqual(
            str(test_order), f'normal_user - {test_order_placement_date}')

    def test_ordered_dish_create(self):
        test_ordered_dish = OrderedDish.objects.create(
            dish=self.test_dish, order=self.test_order)
        self.assertEqual(str(test_ordered_dish),
                         f'pizza - restauracja - adres - hawajska - {self.test_order.user} - {self.test_order.order_placement_date}')

    def test_ordered_extra_create(self):
        test_ordered_extra = OrderedExtra.objects.create(
            extra=self.test_extra, dish=self.test_ordered_dish)
        self.assertEqual(str(test_ordered_extra),
                         f'ketchup - 2.0 - pizza - restauracja - adres - hawajska - normal_user - {self.test_order.order_placement_date}')

