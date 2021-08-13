from django.urls import path, include
from . import views


urlpatterns = [
    path("google/", views.GoogleLoginView.as_view(), name="google"),
    path("github/", views.GithubLoginView.as_view(), name="github_connect"),
]
