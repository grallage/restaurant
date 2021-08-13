from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"user", views.CustomerViewSet)

teacher_router = routers.DefaultRouter()
teacher_router.register(r"class", views.TestViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("create-checkout-session/", views.create_checkout_session),
    path("webhook/", views.stripe_webhook),  # new
    path("retrieve_price_product/", views.retrieve_price_product),
    path("get_all_orders/", views.get_all_orders),
    path("payments_history/", views.payments_history),
    #
    path("customers/", views.customers),
    path("test/", include(teacher_router.urls)),
]
