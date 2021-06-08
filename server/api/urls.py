from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('restaurants/', views.RestaurantList.as_view()),
    path('restaurants/<int:pk>/', views.RestaurantDetails.as_view()),
    path('restaurants/<int:pk>/menu', views.RestaurantMenu.as_view()),
    path('order-history/<int:user_id>/', views.OrderHistory.as_view()),
    path('orders/', views.OrderPlacement.as_view()),
    path('orders/<int:pk>/', views.OrderDetails.as_view()),
    path('delivery-orders/', views.OrdersForDeliveryMan.as_view()),
    path('update-status/', views.DeliveryManStatus.as_view()),
    path('restaurant-orders/', views.OrdersForRestaurant.as_view()),
    path('available-delivery-men/', views.AvailableDeliveries.as_view()),
]
