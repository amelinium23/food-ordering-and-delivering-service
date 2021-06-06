from datetime import datetime, timezone
from django.contrib.gis.db import models
from django.db.models.deletion import CASCADE, SET_NULL
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import pytz


class RestaurantManager(models.Manager):
    def are_open(self):
        open_restaurants_ids = [restaurant.id for restaurant in self.filter(is_active=True)
                                if restaurant.is_open(restaurant.id)]
        return self.filter(id__in=open_restaurants_ids)


class Restaurant(models.Model):
    class CUISINE_TYPE_CHOICES(models.TextChoices):
        OTHER = 'other', _('inne')
        CHINESE = 'cn', _('chińska')
        ITALIAN = 'it', _('włoska')
        TURKISH = 'tr', _('turecka')
        POLISH = 'pl', _('polska')
        INDIAN = 'in', _('indyjska')
        JEWISH = 'il', _('żydowska')
    name = models.CharField(max_length=50)
    logo = models.URLField()
    address = models.CharField(max_length=80)
    location = models.PointField()
    cuisine_type = models.CharField(
        max_length=5, choices=CUISINE_TYPE_CHOICES.choices)
    delivery_cost = models.DecimalField(max_digits=4, decimal_places=1)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    objects = RestaurantManager()

    def is_open(self, id):
        today = datetime.today().weekday()
        if today == 0:
            prev_day = 6
        else:
            prev_day = today - 1
        obj = OpeningHour.objects.get(weekday=today, restaurant=id)
        current_time = datetime.now(tz=pytz.timezone('Europe/Warsaw')).time()
        if obj.opening_hour < obj.closing_hour:
            if obj.opening_hour < current_time < obj.closing_hour:
                return True
        elif obj.opening_hour < current_time:
            return True
        obj = OpeningHour.objects.get(weekday=prev_day, restaurant=id)
        if current_time < obj.closing_hour and obj.closing_hour < obj.opening_hour:
            return True
        return False

    def __str__(self) -> str:
        return f'{self.name} - {self.address}'


class OpeningHour(models.Model):
    class WEEKDAY(models.IntegerChoices):
        MONDAY = 0, _('Poniedziałek')
        TUESDAY = 1, _('Wtorek')
        WEDNESDAY = 2, _('Środa')
        THURSDAY = 3, _('Czwartek')
        FRIDAY = 4, _('Piątek')
        SATURDAY = 5, _('Sobota')
        SUNDAY = 6, _('Niedziela')

    class Meta:
        unique_together = ['weekday', 'restaurant']
    weekday = models.IntegerField(choices=WEEKDAY.choices)
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    opening_hour = models.TimeField()
    closing_hour = models.TimeField()

    def __str__(self) -> str:
        return f'{self.restaurant.name} - {self.weekday}'


class MenuGroup(models.Model):
    restaurant = models.ForeignKey(
        Restaurant, related_name='restaurant', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f'{self.name} - {self.restaurant}'


class Dish(models.Model):
    group = models.ForeignKey(
        MenuGroup, related_name='data', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.URLField()
    price = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self) -> str:
        return f'{self.group} - {self.name}'


class ExtraGroup(models.Model):
    class TYPE_CHOICES(models.IntegerChoices):
        LIST = 1
        BOOL = 2
    dish = models.ForeignKey(
        Dish, related_name='extras_group', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    extra_type = models.IntegerField(choices=TYPE_CHOICES.choices)

    def __str__(self) -> str:
        return f'{self.dish} - {self.name}'


class Extra(models.Model):
    category = models.ForeignKey(
        ExtraGroup, related_name='extras', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    added_price = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self) -> str:
        return f'{self.name} - {self.added_price}'


class Order(models.Model):
    class ORDER_STATUS(models.IntegerChoices):
        ORDER_PLACED = 1
        LOOKING_FOR_DELIVERY = 2
        PROCESSING = 3
        IN_DELIVERY = 4
        DELIVERED = 5
        CANCELLED = 6
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, on_delete=SET_NULL, related_name='purchaser')
    restaurant = models.ForeignKey('Restaurant', on_delete=CASCADE)
    delivery = models.ForeignKey(settings.AUTH_USER_MODEL, null=True,
                                 blank=True, on_delete=SET_NULL, related_name='delivery_man')
    status = models.IntegerField(choices=ORDER_STATUS.choices, default=1)
    order_placement_date = models.DateTimeField(auto_now_add=True)
    order_preparation_date = models.DateTimeField(null=True, blank=True)
    order_delivery_date = models.DateTimeField(null=True, blank=True)
    order_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f'{self.user} - {self.order_placement_date}'


class OrderedDish(models.Model):
    dish = models.ForeignKey('Dish', on_delete=models.CASCADE)
    order = models.ForeignKey(
        'Order', on_delete=models.CASCADE, related_name='dishes')

    def __str__(self) -> str:
        return f'{self.dish} - {self.order}'


class OrderedExtra(models.Model):
    extra = models.ForeignKey('Extra', on_delete=models.CASCADE)
    dish = models.ForeignKey(
        'OrderedDish', on_delete=models.CASCADE, related_name='ordered_extras')

    def __str__(self) -> str:
        return f'{self.extra} - {self.dish}'


class DeliveryManData(models.Model):
    class DeliveryManStatus(models.IntegerChoices):
        ONLINE = 1
        DELIVERING = 2
        OFFLINE = 3
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.IntegerField(choices=DeliveryManStatus.choices, default=3)
    location = models.PointField()
    last_online = models.DateTimeField(auto_now=True)
