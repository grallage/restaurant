import stripe
from . import models
from django.db import transaction
from rest_framework.serializers import ModelSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = models.CustomUserModel
        fields = [
            "userId",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        user = models.CustomUserModel.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


# react自定义注册表单
class CustomRegisterSerializer(RegisterSerializer):
    """REST_AUTH_REGISTER_SERIALIZERS"""

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        stripe_customer = stripe.Customer.create(email=user.email, name=user.username)
        user.stripe_customer_id = stripe_customer.id
        user.save()
        return user
