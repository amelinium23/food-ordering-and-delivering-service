from rest_framework import permissions


class IsNormalUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.account_type == 1


class IsRestaurantOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.account_type == 3


class IsRestaurantOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.account_type != 3:
            return False
        return request.user.restaurantowner.restaurant == obj


class IsRestaurantOwnerForOrder(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.account_type != 3:
            return False
        return request.user.restaurantowner.restaurant == obj.restaurant


class IsDeliveryForOrder(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.delivery


class IsDeliveryAccountOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.account_type == 2

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
