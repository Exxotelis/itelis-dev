import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

#SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-only")
SECRET_KEY = "django-insecure-&5ruyze!i(cs=gotxbzro$1#0zby^^9hepk8uw&^njt&r$o5#n"
#DEBUG = os.getenv("DEBUG", "False") == "True"
DEBUG = True  # Set to False in production

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
    "DIRS": [BASE_DIR / "templates"],   # <-- /backend/templates
    "APP_DIRS": True,
    "OPTIONS": {"context_processors": [
        "django.template.context_processors.debug",
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
    ]},
}]

# Static/Media
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

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