from django.apps import AppConfig


class SocialAuthConfig(AppConfig):
    name = "social_auth"

    def ready(self):
        from . import signals

        return super().ready()
