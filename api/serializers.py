from users.serializers import UserDetailSerializer
from rest_framework import serializers
from drf_extra_fields.geo_fields import PointField
import api.models as models


class RestaurantSerializer(serializers.ModelSerializer):
    cuisine_type = serializers.CharField(source='get_cuisine_type_display')
    distance = serializers.SerializerMethodField()
    location = PointField(required=False)

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
        fields = ['id', 'name', 'added_price']
        read_only_fiels = ['id']


class ExtraGroupSerializer(serializers.ModelSerializer):
    extras = ExtraSerializer(many=True, read_only=True)

    class Meta:
        model = models.ExtraGroup
        fields = ['name', 'extra_type', 'extras']


class DishSerializer(serializers.ModelSerializer):
    extras_group = ExtraGroupSerializer(many=True, read_only=True)

    class Meta:
        model = models.Dish
        fields = ['id', 'name', 'image', 'price', 'extras_group']
        read_only_fields = ['id']


class DishWithoutExtrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Dish
        fields = ['id', 'name', 'image', 'price']
        read_only_fields = ['id']


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
        fields = ['dish']


class OrderSerializer(serializers.ModelSerializer):
    dishes = OrderedDishSerializer(many=True)
    restaurant = serializers.SlugRelatedField(
        read_only=True, slug_field='name')
    user = UserDetailSerializer()

    class Meta:
        model = models.Order
        fields = ['id', 'user', 'dishes', 'restaurant', 'status',
                  'order_placement_date', 'order_delivery_date', 'order_cost']
        read_only_fields = ['id', 'user', 'restaurant', 'order_placement_date']


class OrderForDeliverySerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer()

    class Meta:
        model = models.Order
        fields = ['restaurant']
