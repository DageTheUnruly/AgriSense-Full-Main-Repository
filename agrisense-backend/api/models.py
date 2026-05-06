from django.db import models

class SensorData(models.Model):
    label = models.CharField(max_length=100) # e.g., "Temperature" [cite: 19]
    value = models.CharField(max_length=50) # e.g., "29" [cite: 19]
    unit = models.CharField(max_length=10) # e.g., "°C"
    timestamp = models.DateTimeField(auto_now_add=True)