from django.urls import path, include
from users.views import GoogleLogin

from . import views

urlpatterns = [
    path('users/<int:pk>', views.UserDetail.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('social-login/google/', GoogleLogin.as_view(), name='google_login')
]
