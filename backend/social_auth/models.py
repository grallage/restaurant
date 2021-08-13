from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from uuid import uuid4

import stripe
from core.secrets import STRIPE_TEST_SECRET_KEY

stripe.api_key = STRIPE_TEST_SECRET_KEY


class CustomUserModelManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        # stripe
        stripe_customer = stripe.Customer.create(email=email, name=username)

        # user.stripe_customer_id = stripe_customer.id

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            stripe_customer_id=stripe_customer.id,
        )
        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    userId = models.CharField(
        max_length=16, default=uuid4, primary_key=True, editable=False
    )
    username = models.CharField(max_length=16, unique=True, null=False, blank=False)
    email = models.EmailField(max_length=100, unique=True, null=False, blank=False)

    active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_on = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "username"  # 用户模型上用作唯一标识符的字段名称的字符串, TODO: 可能Twitter和Facebook昵称重复
    REQUIRED_FIELDS = ["email"]

    # Stripe
    stripe_customer_id = models.CharField(max_length=26, default="", blank=True)

    objects = CustomUserModelManager()

    class Meta:
        verbose_name = "自定义用户"
        db_table = "user"
