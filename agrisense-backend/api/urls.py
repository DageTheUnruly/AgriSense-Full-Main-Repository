from django.urls import path
from . import views

urlpatterns = [
 
    path('sensors/', views.get_sensors),           
    path('sensors/<int:pk>/', views.sensor_detail), 
    path('login/', views.login_user),              
]