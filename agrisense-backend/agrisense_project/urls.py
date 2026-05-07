from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework.authtoken import views # <--- Needed for Task 6

urlpatterns = [
    path('admin/', admin.site.urls),
    
    
    path('api/', include('api.urls')), 
    
  
    path('api/api-token-auth/', views.obtain_auth_token),

    path('', lambda request: redirect('api/sensors/', permanent=False)),
]