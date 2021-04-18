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

class OpeningHoursSerializer(serializers.ModelSerializer):
   weekday = serializers.CharField(source='get_weekday_display')
   class Meta:
      model = models.OpeningHours
      fields = ['weekday', 'openingHour', 'closingHour']


class ExtraSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Extra
      fields = ['name', 'added_price', 'description']

class ExtraGroupSerializer(serializers.ModelSerializer):
   extras = ExtraSerializer(many=True, read_only=True)
   class Meta:
      model = models.ExtraGroup
      fields = ['name', 'extra_type', 'extras']
class DishSerializer(serializers.ModelSerializer):
   extras_group = ExtraGroupSerializer(many=True, read_only=True)
   class Meta:
      model = models.Dish
      fields = ['name', 'price', 'description', 'extras_group']

class MenuGroupSerializer(serializers.ModelSerializer):
   data = DishSerializer(many=True, read_only=True)
   class Meta:
      model = models.MenuGroup
      fields = ['name', 'data']

