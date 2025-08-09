from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # Root & SPA fallback
    path("", TemplateView.as_view(template_name="index.html")),
    re_path(r"^(?!api/).*$", TemplateView.as_view(template_name="index.html")),
]
