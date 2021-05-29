from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('restaurants/', views.RestaurantList.as_view()),
    path('restaurants/<int:pk>/', views.RestaurantDetails.as_view()),
    path('restaurants/<int:pk>/menu', views.RestaurantMenu.as_view()),
    path('orders/<int:user_id>/', views.OrderHistory.as_view()),
]
