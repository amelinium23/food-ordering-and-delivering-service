from rest_framework import serializers
import users.models as models

class UserSerializer(serializers.ModelSerializer):
   # data = UserSerializer(many=True, read_only=True)
   class Meta:
      model = models.User
      exclude = ['is_active', 'is_staff', 'status']