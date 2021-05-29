from api.models import Dish, Extra
from rest_framework import serializers
import api.models as models


class RestaurantSerializer(serializers.ModelSerializer):
    cuisine_type = serializers.CharField(source='get_cuisine_type_display')
    distance = serializers.SerializerMethodField()

    class Meta:
        model = models.Restaurant
        exclude = ['is_active']

    def get_distance(self, instance):
        if hasattr(instance, 'distance'):
            return round(instance.distance.km, 3)
        return 0


class OpeningHourSerializer(serializers.ModelSerializer):
    weekday = serializers.CharField(source='get_weekday_display')

    class Meta:
        model = models.OpeningHour
        fields = ['weekday', 'openingHour', 'closingHour']


class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Extra
        fields = ['name', 'added_price']


class ExtraGroupSerializer(serializers.ModelSerializer):
    extras = ExtraSerializer(many=True, read_only=True)

    class Meta:
        model = models.ExtraGroup
        fields = ['name', 'extra_type', 'extras']


class DishSerializer(serializers.ModelSerializer):
    extras_group = ExtraGroupSerializer(many=True, read_only=True)

    class Meta:
        model = models.Dish
        fields = ['name', 'image', 'price', 'extras_group']


class DishWithoutExtrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Dish
        fields = ['name', 'image', 'price']


class MenuGroupSerializer(serializers.ModelSerializer):
    data = DishSerializer(many=True, read_only=True)

    class Meta:
        model = models.MenuGroup
        fields = ['name', 'data']


class OrderedExtraSerializer(serializers.ModelSerializer):
    extra = ExtraSerializer()

    class Meta:
        model = models.OrderedExtra
        fields = ['extra']


class OrderedDishSerializer(serializers.ModelSerializer):
    dish = DishWithoutExtrasSerializer()
    ordered_extras = OrderedExtraSerializer(many=True)

    class Meta:
        model = models.OrderedDish
        fields = ['dish', 'ordered_extras']


class OrderSerializer(serializers.ModelSerializer):
    dishes = OrderedDishSerializer(many=True)
    restaurant = serializers.StringRelatedField()

    class Meta:
        model = models.Order
        fields = ['dishes', 'restaurant', 'status',
                  'order_placement_date', 'order_delivery_date', 'order_cost']
