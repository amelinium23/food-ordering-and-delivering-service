from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings


class AccountManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, password, **other_fields):
        if not email:
            raise ValueError('No email')
        if not username:
            raise ValueError('No username')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, first_name, last_name, password, **other_fields):
        other_fields.setdefault('account_type', 4)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_staff', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('User must be staff')
        if other_fields.get('account_type') != 4:
            raise ValueError('Admin must be admin')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
        return self.create_user(username, email, first_name, last_name, password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Status(models.IntegerChoices):
        NORMAL = 1
        DELIVERY = 2
        RESTAURANT = 3
        ADMIN = 4
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    account_type = models.IntegerField(choices=Status.choices, default=1)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = AccountManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self) -> str:
        return self.username

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'


class DeliveryManData(models.Model):
    class DeliveryManStatus(models.IntegerChoices):
        ONLINE = 1
        DELIVERING = 2
        OFFLINE = 3
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.IntegerField(choices=DeliveryManStatus.choices, default=3)
    location = models.PointField()
    last_online = models.DateTimeField(auto_now=True)


class RestaurantOwner(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    restaurant = models.OneToOneField('api.Restaurant', on_delete=models.CASCADE)
