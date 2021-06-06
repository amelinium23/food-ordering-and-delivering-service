from django.contrib import admin
from django.contrib.gis.forms.widgets import OSMWidget
from django.contrib.gis.db import models
from .models import User, DeliveryManData, RestaurantOwner
from django.contrib.auth.admin import UserAdmin


class UserProfileInline(admin.StackedInline):
    model = DeliveryManData
    max_num = 1
    can_delete = True
    formfield_overrides = {
        models.PointField: {"widget": OSMWidget},
    }


class RestaurantOwnerProfileInline(admin.StackedInline):
    model = RestaurantOwner
    max_num = 1
    can_delete = True


class UserAdminConfig(UserAdmin):
    inlines = [UserProfileInline, RestaurantOwnerProfileInline]
    search_fields = ('email', 'username',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'account_type')}),
        ('Personal', {'fields': ('address',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'account_type')
        }),
    )
    list_filter = ('username', 'is_active', 'account_type')
    ordering = ('-created_at', 'account_type')
    list_display = ('id', 'email', 'username', 'first_name',
                    'last_name', 'account_type')


admin.site.register(User, UserAdminConfig)
