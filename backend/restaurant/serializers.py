from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import Q
from rest_framework import serializers

import logging, stripe
from social_auth import models

from core.secrets import STRIPE_TEST_SECRET_KEY

stripe.api_key = STRIPE_TEST_SECRET_KEY
logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    # 不标注下面两行将不走 validate(self, attrs)
    email = serializers.EmailField()
    username = serializers.CharField()

    class Meta:
        model = models.CustomUserModel
        fields = ["username", "email"]
        # exclude = ["password"]

    def validate(self, attrs):
        request = self.context.get("request")
        tokenUser = request.user

        errors = {}

        if request.method == "PUT":
            errorMsg = ""
            id = request.parser_context.get("kwargs").get("pk", -1)
            user = models.CustomUserModel.objects.get(pk=tokenUser.id)
            count = models.CustomUserModel.objects.filter(
                ~Q(userId=user.userId),
                email=attrs["email"]
                # Q(email=attrs["email"]) | Q(username=attrs["username"]),
            ).count()

            if count > 0:
                errorMsg = "邮箱重复"

            count = models.CustomUserModel.objects.filter(
                ~Q(userId=user.userId), username=attrs["username"]
            ).count()

            if count > 0:
                errorMsg = "昵称、邮箱重复" if len(errorMsg) > 0 else "昵称重复"

            print(errorMsg)

            if len(errorMsg) > 0:
                errors["detail"] = errorMsg
        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(attrs)

    @transaction.atomic
    def update(self, instance, validated_data):
        # return super().update(instance, validated_data)

        # username = validated_data.pop("username")
        # email = validated_data.pop("email")
        # userSerializer = UserSerializer(
        #     models.CustomUserModel.objects.get(pk=instance.userId),
        #     data={
        #         "username": username,
        #         "email": email,
        #     },
        # )
        # userSerializer.is_valid(raise_exception=True)
        # userSerializer.save()
        user = models.CustomUserModel.objects.get(pk=instance.userId)
        username = user.username
        email = user.email
        print(user.stripe_customer_id)
        print(instance.userId)

        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        stripe.Customer.modify(
            user.stripe_customer_id, email=instance.email, name=instance.username
        )

        return instance
