from django.urls import path, include
from users.views import GoogleLogin, FacebookLogin


app_name = 'users'
urlpatterns = [
    path('auth/', include('dj_rest_auth.urls'), name='auth'),
    path('social-login/google/', GoogleLogin.as_view(), name='google_login'),
    path('social-login/facebook/', FacebookLogin.as_view(), name='facebook_login'),
    path('registration/', include('dj_rest_auth.registration.urls'),
         name='registration')
]
