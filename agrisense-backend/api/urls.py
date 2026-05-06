from django.urls import path
from . import views

urlpatterns = [
    # [Highlight: No "api/" here—it's already handled by the project urls.py]
    path('sensors/', views.get_sensors),           # URL: /api/sensors/
    path('sensors/<int:pk>/', views.sensor_detail), # URL: /api/sensors/1/
    path('login/', views.login_user),              # URL: /api/login/[cite: 1]
]