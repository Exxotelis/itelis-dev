import os
from pathlib import Path

from django.conf import settings
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-only")
#SECRET_KEY = "django-insecure-&5ruyze!i(cs=gotxbzro$1#0zby^^9hepk8uw&^njt&r$o5#n"
DEBUG = os.getenv("DEBUG", "False") == "True"
#DEBUG = True  # Set to False in production

ALLOWED_HOSTS = [
    "exxotelis.com",
    "www.exxotelis.com",
    "itelis-dev-production.up.railway.app", 
    ]  

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://exxotelis.com",
    "https://www.exxotelis.com",
    "https://itelis-dev-production.up.railway.app",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "api",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Templates: βάλε φάκελο templates στο backend/
TEMPLATES = [{
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [BASE_DIR / "templates"],  
    "APP_DIRS": True,
    "OPTIONS": {"context_processors": [
        "django.template.context_processors.debug",
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
    ]},
}]

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
if settings.DEBUG:  # μόνο σε development
    FRONTEND_DIST = (BASE_DIR.parent / 'frontend' / 'dist').resolve()
    print(">> FRONTEND_DIST =", FRONTEND_DIST)  # προσωρινό debug
    STATICFILES_DIRS = [FRONTEND_DIST]
else:
    STATICFILES_DIRS = [BASE_DIR / 'static'] 

MEDIA_URL = "/media/"
MEDIA_ROOT = os.getenv("MEDIA_ROOT", BASE_DIR / "media")

# SQLite (μένουμε σε SQLite)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.getenv("SQLITE_PATH", BASE_DIR / "db.sqlite3"),
    }
}
ROOT_URLCONF = "core.urls"
WSGI_APPLICATION = "core.wsgi.application"


SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
X_FRAME_OPTIONS = "DENY"
SECURE_REFERRER_POLICY = "same-origin"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "ignore_noise": {
            "()": "django.utils.log.CallbackFilter",
            "callback": lambda r: not any(
                bad in (getattr(r, "request", None) and r.request.get_full_path() or "")
                for bad in ["/wp-", "xmlrpc.php", ".env", "/.git", ".php"]
            ),
        }
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "filters": ["ignore_noise"]},
    },
    "loggers": {
        "django.request": {"handlers": ["console"], "level": "WARNING", "propagate": False},
        "django.security.DisallowedHost": {"handlers": ["console"], "level": "ERROR", "propagate": False},
    },
}
