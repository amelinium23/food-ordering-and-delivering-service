from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
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
    cuisine_type = models.CharField(max_length=5, choices=CUISINE_TYPE_CHOICES.choices)
    delivery_cost = models.DecimalField(max_digits=4, decimal_places=2)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)

class OpeningHours(models.Model):
    class WEEKDAY(models.TextChoices):
        MONDAY = 1, _('Poniedziałek')
        TUESDAY = 2, _('Wtorek')
        WEDNESDAY = 3, _('Środa')
        THURSDAY = 4, _('Czwartek')
        FRIDAY = 5, _('Piątek')
        SATURDAY = 6, _('Sobota')
        SUNDAY = 7, _('Niedziela')
    weekday = models.IntegerField(choices=WEEKDAY.choices)
    restaurant_id = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    openingHour = models.CharField(max_length=5)
    closingHour = models.CharField(max_length=5)
class MenuGroup(models.Model):
    restaurant_id = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

class Dish(models.Model):
    group_id =  models.ForeignKey('MenuGroup', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=4, decimal_places=2)
    description = models.TextField(blank=True)

class ExtraGroup(models.Model):
    class TYPE_CHOICES(models.IntegerChoices):
        LIST = 1
        BOOL = 2
    name = models.CharField(max_length=30)
    extra_type = models.IntegerField(choices=TYPE_CHOICES.choices)
    dish_id = models.ForeignKey('Dish', on_delete=models.CASCADE)


class Extra(models.Model):
    category_id = models.ForeignKey('ExtraGroup', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    added_price = models.DecimalField(max_digits=4, decimal_places=2)
    description = models.TextField(blank=True)

class Order(models.Model):
    class ORDER_STATUS(models.IntegerChoices):
        ORDER_PLACED = 1
        LOOKING_FOR_DELIVERY = 2
        PROCESSING = 3
        IN_DELIVERY = 4
        DELIVERED = 5
        CANCELLED = 6
    user_id = models.ForeignKey('User')
    restaurant_id = models.ForeignKey()
    delivery_id = models.ForeignKey('User', null=True, blank=True)
    status = models.IntegerField(choices=ORDER_STATUS)
    order_placement_date = models.DateTimeField(auto_now_add=True)
    order_preparation_date = models.DateTimeField(null=True, blank=True)
    order_delivery_date = models.DateTimeField(null=True, blank=True)
    order_cost = models.DecimalField(decimal_places=2)

class OrderedDish(models.Model):
    dish_id = models.ForeignKey('Dish', on_delete=models.CASCADE)
    order_id = models.ForeignKey('Order', on_delete=models.CASCADE)

class OrderedExtra(models.Model):
    extra_id = models.ForeignKey('Extra', on_delete=models.CASCADE)
    dish_id = models.ForeignKey('OrderedDish', on_delete=models.CASCADE)




