from django.contrib.gis import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Dish, Extra, ExtraGroup, MenuGroup, OpeningHour, Restaurant
import nested_admin

# Register your models here.


class OpeningHourInline(nested_admin.NestedTabularInline):
    model = OpeningHour


class ExtraInline(nested_admin.NestedTabularInline):
    model = Extra


class ExtraGroupInline(nested_admin.NestedTabularInline):
    model = ExtraGroup
    inlines = [ExtraInline]


class DishInline(nested_admin.NestedTabularInline):
    model = Dish
    inlines = [ExtraGroupInline]


class MenuGroupInline(nested_admin.NestedTabularInline):
    model = MenuGroup
    inlines = [DishInline]


@admin.register(Restaurant)
class RestaurantAdmin(OSMGeoAdmin, nested_admin.NestedModelAdmin):
    inlines = [
        OpeningHourInline,
        MenuGroupInline,
    ]
    list_display = ('name', 'location')


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__')
    readonly_fields = ('id',)


@admin.register(Extra)
class ExtraAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__')
    readonly_fields = ('id', )
