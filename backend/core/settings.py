from pathlib import Path
from .secrets import (
    DJANGO_SECRET_KEY,
    JWT_SECRET_KEY,
    STRIPE_LIVE_SECRET_KEY,
    STRIPE_TEST_SECRET_KEY,
)
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = DJANGO_SECRET_KEY
DEBUG = False
FRONTEND_URL = "http://localhost:3000"
ALLOWED_HOSTS = ["*"]
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd party
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "django.contrib.sites",
    # authentication
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.github",
    # payment
    "djstripe",
    # local app
    "social_auth.apps.SocialAuthConfig",
    "restaurant.apps.RestaurantConfig",
]

# --------------------  django-allauth {  --------------------

# https://django-allauth.readthedocs.io/en/latest/configuration.html
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        # # For each OAuth based provider, either add a ``SocialApp``
        # # (``socialaccount`` app) containing the required client
        # # credentials, or list them here:
        # "APP": {
        #     "client_id": "123",
        #     "secret": "456",
        #     "key": ""
        # },
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
    },
    "github": {
        # For each provider, you can choose whether or not the
        # email address(es) retrieved from the provider are to be
        # interpreted as verified.
        "VERIFIED_EMAIL": True
    },
}
# we are turning off email verification for now
SOCIALACCOUNT_EMAIL_VERIFICATION = "none"
SOCIALACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "none"
LOGIN_URL = "https://localhost:8000/dj-rest-auth/login"


# --------------------  django-allauth }  --------------------

# --------------------  dj-rest-auth {  --------------------

SITE_ID = 1
REST_USE_JWT = True
JWT_AUTH_COOKIE = "jwt-auth"
# JWT_AUTH_REFRESH_COOKIE = "auth-refresh-token"
# AUTH_HEADER_NAME = "Authorization"
# JWT_AUTH_SAMESITE = "none"

# We need to specify the exact serializer as well for dj-rest-auth, otherwise it will end up shooting itself
# in the foot and me in the head
REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "social_auth.serializers.CustomUserModelSerializer"
}
REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "social_auth.serializers.CustomRegisterSerializer",
}

# --------------------  dj-rest-auth }  --------------------

# --------------------  djangorestframework-simplejwt {  --------------------
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
SIMPLE_JWT = {
    # "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    # "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    # "ROTATE_REFRESH_TOKENS": True,
    # "BLACKLIST_AFTER_ROTATION": True,
    # "UPDATE_LAST_LOGIN": True,
    # "USER_ID_FIELD": "userId",  # for the custom user model (CustomUserModel)
    # "USER_ID_CLAIM": "user_id",
    # "SIGNING_KEY": JWT_SECRET_KEY,
    # 测试
    "USER_ID_FIELD": "userId",  # for the custom user model (CustomUserModel)
    "USER_ID_CLAIM": "user_id",
    "SIGNING_KEY": JWT_SECRET_KEY,
    "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
# --------------------  djangorestframework-simplejwt }  --------------------

# --------------------  django-cors-headers }  --------------------

# CORS_ORIGIN_ALLOW_ALL = True  # only for dev environment!, this should be changed before you push to production

# corsheaders setting
CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]
# --------------------  django-cors-headers }  --------------------


# --------------------  django-rest-framework {  --------------------
# https://www.django-rest-framework.org/api-guide/settings/
# set up the authentication classes
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # 前两个默认
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        # "dj_rest_auth.utils.JWTCookieAuthentication",
        # # "rest_framework.authentication.TokenAuthentication",
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
        # "rest_framework.authentication.TokenAuthentication",
    ),
    # 测试
    # "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
}

# --------------------  django-rest-framework }  --------------------


# --------------------  sripe payment {  --------------------
STRIPE_LIVE_SECRET_KEY = STRIPE_LIVE_SECRET_KEY
STRIPE_TEST_SECRET_KEY = STRIPE_TEST_SECRET_KEY
STRIPE_LIVE_MODE = False  # Change to True in production
DJSTRIPE_WEBHOOK_SECRET = "whsec_xxx"  # Get it from the section in the Stripe dashboard where you added the webhook endpoint
DJSTRIPE_USE_NATIVE_JSONFIELD = (
    True  # We recommend setting to True for new installations
)
DJSTRIPE_FOREIGN_KEY_TO_FIELD = "id"  # Set to `"id"` for all new 2.4+ installations
# --------------------  sripe payment }  --------------------

ROOT_URLCONF = "core.urls"

# custom user model, because we do not want to use the Django provided user model
AUTH_USER_MODEL = "social_auth.CustomUserModel"


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # django-cors-headers
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

# 密码校验 - 先取消默认4类限制
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    # {
    #     "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    # },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"
# LANGUAGE_CODE = "zh-hans"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# 其他配置

"""
withCredentials in cross domain request dosn't work
# https://github.com/axios/axios/issues/1661
# SESSION_COOKIE_SAMESITE = None
# CRSF_COOKIE_SAMESITE = None
"""
