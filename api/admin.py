from django.contrib.gis import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Dish, Extra, ExtraGroup, MenuGroup, OpeningHour, Restaurant, Order, OrderedDish, OrderedExtra
import nested_admin

# Register your models here.


class OpeningHourInline(nested_admin.NestedTabularInline):
    model = OpeningHour


class ExtraInline(nested_admin.NestedTabularInline):
    model = Extra


class ExtraGroupInline(nested_admin.NestedTabularInline):
    model = ExtraGroup
    inlines = [ExtraInline]


@admin.register(MenuGroup)
class MenuGroupInline(nested_admin.NestedModelAdmin):
    # model = MenuGroup
    # inlines = [DishInline]
    pass


@admin.register(Restaurant)
class RestaurantAdmin(OSMGeoAdmin, nested_admin.NestedModelAdmin):
    inlines = [
        OpeningHourInline,
        # MenuGroupInline,
    ]
    list_display = ('name', 'location')


@admin.register(Dish)
class DishAdmin(nested_admin.NestedModelAdmin):
    list_display = ('id', '__str__')
    readonly_fields = ('id',)
    inlines = [
        ExtraGroupInline,
    ]


@admin.register(Extra)
class ExtraAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__')
    readonly_fields = ('id', )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderedDish)
class OrderedDishAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderedExtra)
class OrderedExtraAdmin(admin.ModelAdmin):
    pass
