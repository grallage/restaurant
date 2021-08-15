from django.db.models import signals
from django.dispatch import receiver

import logging, stripe
from . import models

from core.secrets import STRIPE_TEST_SECRET_KEY

stripe.api_key = STRIPE_TEST_SECRET_KEY

logger = logging.getLogger(__name__)


@receiver(signals.post_save, sender=models.CustomUserModel)
def add_user_stripe(sender, instance, **kwargs):

    if not instance.stripe_customer_id:
        stripe_customer = stripe.Customer.create(
            email=instance.email, name=instance.username
        )
        instance.stripe_customer_id = stripe_customer.id
        instance.save()
