from django.shortcuts import render
from django.conf import settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

import logging


logger = logging.getLogger(__name__)


class GoogleLoginView(SocialLoginView):
    # disable authentication, make sure to override `allowed origins` in settings.py in production!
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.FRONTEND_URL  # frontend application url
    client_class = OAuth2Client


class GithubLoginView(SocialLoginView):
    # disable authentication, make sure to override `allowed origins` in settings.py in production!
    authentication_classes = []
    adapter_class = GitHubOAuth2Adapter
    callback_url = settings.FRONTEND_URL  # frontend application url
    client_class = OAuth2Client
