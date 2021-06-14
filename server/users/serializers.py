from rest_framework import serializers
import users.models as models
from drf_extra_fields.geo_fields import PointField


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'email', 'username', 'first_name',
                  'last_name', 'account_type']
        read_only_fields = ('email', 'id',)


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = models.User
        fields = ['email', 'username', 'password', 'password2',
                  'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def save(self, request):
        user = self.Meta.model(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class DeliveryManDataSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    location = PointField(required=False)
    distance_to_restaurant = serializers.SerializerMethodField()

    def get_distance_to_restaurant(self, instance):
        if hasattr(instance, 'distance'):
            return round(instance.distance.km, 3)
        return 0

    class Meta:
        model = models.DeliveryManData
        exclude = ['id', 'status']
