from datetime import datetime

from users.models import User
from users.serializers import UserSerializer
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

# Create your views here.


class GoogleLogin(SocialLoginView):
    authentication_classes = []  # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/login"
    client_class = OAuth2Client


class FacebookLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = FacebookOAuth2Adapter
    callback_url = "http://localhost:3000/login"
    client_class = OAuth2Client
