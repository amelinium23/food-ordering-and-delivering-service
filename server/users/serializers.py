from rest_framework import serializers
import users.models as models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        exclude = ['is_active', 'is_staff', 'is_superuser',
                   'created_at', 'groups', 'user_permissions', 'password', 'last_login']
