from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Restaurant(models.Model):
    CUISINE_TYPE_CHOICES = ['inne', 'chińska', 'włoska', 'turecka', 'polska', 'indyjska']
    name = models.CharField(max_length=50)
    logo = models.URLField()
    address = models.CharField()
    cuisine_type = models.CharField(choices=CUISINE_TYPE_CHOICES)
    delivery_cost = models.DecimalField(max_digits=4, decimal_places=2)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)

class OpeningHours(models.Model):
    class Weekday(models.TextChoices):
        MONDAY = 1, _('Poniedziałek')
        TUESDAY = 2, _('Wtorek')
        WEDNESDAY = 3, _('Środa')
        THURSDAY = 4, _('Czwartek')
        FRIDAY = 5, _('Piątek')
        SATURDAY = 6, _('Sobota')
        SUNDAY = 7, _('Niedziela')
    weekday = models.IntegerField(choices=Weekday.choices)
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
    type_choices = ['list','bool']
    name = models.CharField(max_length=30)
    extra_type = models.CharField(choices=type_choices)

class Extra(models.Model):
    category_id = models.ForeignKey('Dish', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    added_price = models.DecimalField(max_digits=4, decimal_places=2)
    description = models.TextField(blank=True)

