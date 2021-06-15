from django.urls import path

from . import views

app_name = 'api'
urlpatterns = [
    path('', views.index, name='index'),
    path('restaurants/', views.RestaurantList.as_view(), name='restaurants'),
    path('restaurants/<int:pk>/', views.RestaurantDetails.as_view(),
         name='restaurantDetails'),
    path('restaurants/<int:pk>/menu', views.RestaurantMenu.as_view()),
    path('order-history/<int:user_id>/', views.OrderHistory.as_view()),
    path('orders/', views.OrderPlacement.as_view(), name='orders'),
    path('orders/<int:pk>/', views.OrderDetails.as_view()),
    path('delivery-orders/', views.OrdersForDeliveryMan.as_view()),
    path('update-status/', views.DeliveryManStatus.as_view()),
    path('restaurant-orders/', views.OrdersForRestaurant.as_view()),
    path('available-delivery-men/', views.AvailableDeliveries.as_view()),
    path('restaurant-from-order/<int:pk>/', views.RestaurantDetailsForOrder.as_view())
]
