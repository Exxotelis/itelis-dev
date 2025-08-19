from django.contrib import admin
from django.urls import path, include, re_path
from django.http import FileResponse
from django.conf import settings
import os

def spa_view(request):
    index_path = settings.BASE_DIR.parent / "frontend" / "dist" / "index.html"
    return FileResponse(open(index_path, "rb"))

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # όλα τα υπόλοιπα εκτός από api/static/media → React SPA
    re_path(r"^(?!api/)(?!static/)(?!media/).*$", spa_view),
]
