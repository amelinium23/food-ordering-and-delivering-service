from django.urls import path, include
from users.views import GoogleLogin, FacebookLogin

from . import views

urlpatterns = [
    path('users/<int:pk>', views.UserDetail.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('social-login/google/', GoogleLogin.as_view(), name='google_login'),
    path('social-login/facebook/', FacebookLogin.as_view(), name='facebook_login')
]
