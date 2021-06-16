from django.urls import path

from . import views

app_name = 'api'
urlpatterns = [
    path('restaurants/', views.RestaurantList.as_view(), name='restaurants'),
    path('restaurants/<int:pk>/', views.RestaurantDetails.as_view(),
         name='restaurantDetails'),
    path('restaurants/<int:pk>/menu', views.RestaurantMenu.as_view(), name='restaurantMenu'),
    path('order-history/<int:user_id>/', views.OrderHistory.as_view(), name='userOrderHistory'),
    path('orders/', views.OrderPlacement.as_view(), name='orders'),
    path('orders/<int:pk>/', views.OrderDetails.as_view(), name='orderDetails'),
    path('delivery-orders/', views.OrdersForDeliveryMan.as_view(), name="deliveryManOrders"),
    path('update-status/', views.DeliveryManStatus.as_view(), name='updateStatus'),
    path('restaurant-orders/', views.OrdersForRestaurant.as_view(), name="restaurantOrders"),
    path('available-delivery-men/', views.AvailableDeliveries.as_view(), name='availableDeliveryMan'),
    path('restaurant-from-order/<int:pk>/', views.RestaurantDetailsForOrder.as_view(), name='restaurantDetailsFromOrder')
]
