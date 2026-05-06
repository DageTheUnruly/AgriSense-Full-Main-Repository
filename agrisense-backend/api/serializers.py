from rest_framework import serializers
from .models import SensorData
from django.contrib.auth.models import User

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']