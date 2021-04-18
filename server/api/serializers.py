from rest_framework import serializers
import api.models

class RestaurantSerializer(serializers.ModelSerializer):
   class Meta:
      model = Restaurant
      exclude = ['is_active']

class OpeningHoursSerializer(serializers.ModelSerializer):
   weekday = serializers.CharField(source='get_weekday_display')
   class Meta:
      model = OpeningHours
      fields = ['weekday', 'openingHour', 'closingHour']

class MenuGroupSerializer(serializers.ModelSerializer):
   data = DishSerializer(many=True, readonly=True)
   class Meta:
      model = MenuGroup
      fields = ['name', 'data']

class DishSerializer(serializers.ModelSerializer):
   extras_group = ExtraGroupSerializer(many=True, readonly=True)
   class Meta:
      model = Dish
      fields = ['name', 'price', 'description', 'extras_group']

class ExtraGroupSerializer(serializers.ModelSerializer):
   extras = ExtraSerializer(many=True, readonly=True)
   class Meta:
      model = ExtraGroup
      fields = ['name', 'extra_type', 'extras']

class ExtraSerializer(serializers.ModelSerializer):
   class Meta:
      model = Extra
      fields = ['name', 'added_price', 'description']