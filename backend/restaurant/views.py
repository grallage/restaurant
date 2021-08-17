from django.shortcuts import render
from django.conf import settings
from django.http.response import HttpResponseRedirect
from django.http.response import JsonResponse, HttpResponse

from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)


import stripe, logging, json
from django.views.decorators.csrf import csrf_exempt
from stripe.api_resources import checkout
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import AllowAny

from rest_framework import viewsets, permissions, urls, status
from django.contrib.auth.models import AnonymousUser
from social_auth import models
from . import serializers
from rest_framework import generics, mixins

logger = logging.getLogger(__name__)
stripe.api_key = settings.STRIPE_TEST_SECRET_KEY


class UserPermission(permissions.BasePermission):
    message = "权限不足"

    def has_permission(self, request, view):
        print(request.user)
        user = request.user
        if isinstance(user, AnonymousUser):
            return False
        return True


# 获取、更新客户邮箱地址和昵称
class CustomerViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    permission_classes = [UserPermission]
    authentication_classes = [JWTTokenUserAuthentication]
    queryset = models.CustomUserModel.objects.all()
    serializer_class = serializers.UserSerializer


# 显示所有食品列表
@csrf_exempt
def retrieve_price_product(request):
    priceList = []
    # https://stripe.com/docs/api/prices/object
    data = stripe.Price.list(
        limit=100, active=True, type="one_time", expand=["data.product"]
    )
    for priceItem in data.auto_paging_iter():
        priceList.append(priceItem)

    return JsonResponse({"dataList": priceList})


# curl -X POST -is "http://localhost:8000/create-checkout-session/" -d ""
# 创建支付session
@csrf_exempt
@api_view(["POST"])
@authentication_classes((JWTCookieAuthentication,))
# @permission_classes((IsAuthenticated,))
@permission_classes((AllowAny,))
def create_checkout_session(request):
    phone = request.POST["phone"]
    remark = request.POST["remark"]
    deliveryAddress = request.POST["deliveryAddress"]
    carts = json.loads(request.POST["carts"])

    customer_email = None
    stripe_customer_id = None
    print(request.user)
    if not isinstance(request.user, AnonymousUser):
        customer_email = request.user.email
        stripe_customer_id = request.user.stripe_customer_id

    session = stripe.checkout.Session.create(
        # client_reference_id=request.user.id if request.user.is_authenticated else None,
        # https://stripe.com/docs/api/checkout/sessions/create
        payment_method_types=["card"],
        line_items=carts,
        mode="payment",
        # success_url=settings.FRONTEND_URL,
        success_url=settings.FRONTEND_URL
        + "/order/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="{url}/cart".format(url=settings.FRONTEND_URL),
        metadata={
            "phone": phone,
            "remark": remark,
            "deliveryAddress": deliveryAddress,
        },
        customer=stripe_customer_id,
    )

    print(session.keys())
    return JsonResponse({"session": session, "sid": session.id, "url": session.url})


# 获取历史订单记录
@csrf_exempt
@api_view(["GET"])
@authentication_classes((JWTCookieAuthentication,))
def payments_history(request):
    checkoutList = []

    paymentIntentList = stripe.PaymentIntent.list(
        customer=request.user.stripe_customer_id,
        # created=
    )
    for paymentIntent in paymentIntentList.auto_paging_iter():
        checkout = stripe.checkout.Session.list(payment_intent=paymentIntent.id).data[0]
        charges = []
        line_items = []
        for charge in paymentIntent.charges.data:
            receipt_url = stripe.Charge.retrieve(charge.id).receipt_url
            charges.append({"receipt_url": receipt_url, "created": charge.created})

        lineItems = stripe.checkout.Session.list_line_items(checkout.id)
        for line_item in lineItems.auto_paging_iter():
            product = stripe.Product.retrieve(line_item["price"]["product"])
            line_item["images"] = product.images
            line_items.append(line_item)

        payment_intent = {
            "id": paymentIntent.id,
            "created": paymentIntent.created,  # Time at which the object was created. Measured in seconds since the Unix epoch.
            "charges": charges,
        }

        checkoutMap = {
            "id": checkout.id,
            "amount_total": checkout.amount_total,
            "currency": checkout.currency,  # hkd
            "customer": checkout.customer,
            "customer_details": checkout.customer_details,
            "customer_email": checkout.customer_email,
            "livemode": checkout.livemode,
            "metadata": checkout.metadata,
            "payment_status": checkout.payment_status,  # paid、unpaid
            "payment_intent": payment_intent,
            "line_items": line_items,
        }
        checkoutList.append(checkoutMap)

    return JsonResponse({"checkouts": checkoutList})


@csrf_exempt
@api_view(["GET"])
@authentication_classes((JWTCookieAuthentication,))
# @permission_classes((IsAuthenticated,))
def customers(request):
    print(request.user)
    print(request.user.stripe_customer_id)
    customers = stripe.Customer.list(limit=100, email="a@a.com")
    return JsonResponse({"customers": customers})


class TestViewSet(viewsets.ModelViewSet):
    permission_classes = [UserPermission]
    # authentication_classes = [JWTTokenUserAuthentication]
    queryset = models.CustomUserModel.objects.all()
    serializer_class = serializers.UserSerializer
    ordering_fields = "__all__"


@csrf_exempt
def get_all_orders(request):
    # orders = stripe.Order.list(
    # orders = stripe.checkout.Session.list(
    #     limit=1,
    #     # customer=''
    #     expand=["data.payment_intent"],
    # )
    orders = stripe.PaymentIntent.list(
        limit=100,
        customer="cus_JtO7gLKnzJcXr0",
        # created=
    )

    # 收据
    # orders = stripe.Charge.list(
    #     # limit=100,
    #     # # customer=''
    #     expand=["data.payment_intent"],
    # )

    # 获取商品内容
    orders = stripe.checkout.Session.list_line_items(
        "cs_test_b1ub6ARptIP9YSkhKPzaAJuqlKmEBCkPhCOfA7WmHUQUaXYLcdbYDCZuLP"
    )

    # orders = stripe.checkout.Session.retrieve(
    #     id="cs_test_b1ub6ARptIP9YSkhKPzaAJuqlKmEBCkPhCOfA7WmHUQUaXYLcdbYDCZuLP",
    #     expand=["payment_intent", "subscription"],
    # )
    return JsonResponse(
        {
            "orders": orders,
        }
    )
    # return HttpResponseRedirect(redirect_to=session.url)


@csrf_exempt
def stripe_webhook(request):
    # endpoint_secret = settings.STRIPE_ENDPOINT_SECRET
    endpoint_secret = "rk_test_51J5AMFHcX0kp4ynFy2FIvtxr2wSNkL319xQFzUx3KxbBgBcR3yqHdIUqQ8ExRpXKj8IELkgm9HD7G0oB8BtWWYyP007qZMJUPZ"
    endpoint_secret = "whsec_k7Mxzl8JRvE3E08CmrdQ12WXquligHjb"
    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    event = None

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)
    print("############ stripe_webhook 触发: ", event["type"])
    """
    payment_intent.created
    customer.created
    payment_intent.succeeded
    checkout.session.completed
    charge.succeeded
    customer.updated
    """

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        print("支付成功！ Payment was successful.")
        # TODO: run some custom code here

    return HttpResponse(status=200)
