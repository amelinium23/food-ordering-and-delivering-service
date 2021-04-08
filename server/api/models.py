from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Restaurant(models.Model):
    class CUISINE_TYPE_CHOICES(models.TextChoices):
        OTHER = 'def', _('inne')
        CHINESE = 'ch', _('chińska')
        ITALIAN = 'it', _('włoska')
        TURKISH = 'tu', _('turecka')
        POLISH = 'po', _('polska')
        INDIAN = 'in', _('indyjska')
        JEWISH = 'je', _('żydowska')
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


class Extra(models.Model):
    category_id = models.ForeignKey('Dish', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    added_price = models.DecimalField(max_digits=4, decimal_places=2)
    description = models.TextField(blank=True)

