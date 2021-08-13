from django.contrib import admin
from django.urls import path, include

# from dj_rest_auth.utils import JWTCookieAuthentication
# from rest_framework.authentication import TokenAuthentication
from dj_rest_auth.jwt_auth import JWTCookieAuthentication


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/social/login/", include("social_auth.urls")),
    # dj-rest-auth
    # https://github.com/iMerica/dj-rest-auth/blob/master/demo/demo/urls.py
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    # payment
    path("stripe/", include("djstripe.urls", namespace="djstripe")),
    # test
    # path("", include("restaurant.urls", namespace="restaurant")),
    path("", include("restaurant.urls")),
    # path("accounts/", include("allauth.urls"), name="socialaccount_signup"),
]
