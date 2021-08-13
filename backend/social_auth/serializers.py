from rest_framework.serializers import ModelSerializer
from . import models
from django.conf import settings


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


from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
import stripe

# react自定义注册表单
class CustomRegisterSerializer(RegisterSerializer):
    """REST_AUTH_REGISTER_SERIALIZERS"""

    # gender = serializers.ChoiceField(choices=GENDER_SELECTION)
    # phone_number = serializers.CharField(max_length=30)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        # user.gender = self.data.get('gender')
        # user.phone_number = self.data.get('phone_number')
        stripe_customer = stripe.Customer.create(email=user.email, name=user.username)
        user.stripe_customer_id = stripe_customer.id
        user.save()
        return user
