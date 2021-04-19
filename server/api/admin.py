from django.contrib.gis import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import OpeningHours, Restaurant

# Register your models here.
@admin.register(Restaurant)
class RestaurantAdmin(OSMGeoAdmin):
    list_display = ('name', 'location')

@admin.register(OpeningHours)
class OpeningHoursAdmin(admin.ModelAdmin):
    pass