from django.contrib import admin
from django.urls import path, include


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
    # restaurant api
    path("", include("restaurant.urls")),
    # test
    # path("accounts/", include("allauth.urls"), name="socialaccount_signup"),
]
