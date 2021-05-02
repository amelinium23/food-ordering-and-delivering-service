from rest_framework import serializers
import users.models as models

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.User
      exclude = ['is_active', 'is_staff', 'status']