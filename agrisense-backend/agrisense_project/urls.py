from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect # Add this import

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # This line redirects the empty base URL to your sensors API
    path('', lambda request: redirect('api/sensors/', permanent=False)),
]