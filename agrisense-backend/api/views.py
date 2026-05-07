from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import SensorData
from .serializers import SensorSerializer
from rest_framework.authtoken.models import Token

# --- TASK 3, 4 & 5: LIST AND CREATE ---
@api_view(['GET', 'POST'])
# REMOVED [AllowAny] -> Now it uses the Global IsAuthenticated lock
def get_sensors(request): 
    if request.method == 'GET': 
        data = SensorData.objects.all()
        serializer = SensorSerializer(data, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SensorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- TASK 7: UPDATE ---
@api_view(['GET', 'PATCH', 'DELETE'])
# REMOVED [AllowAny] -> Now it uses the Global IsAuthenticated lock
def sensor_detail(request, pk):
    try:
        sensor = SensorData.objects.get(pk=pk)
    except SensorData.DoesNotExist:
        return Response({"error": "Sensor not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SensorSerializer(sensor)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = SensorSerializer(sensor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        sensor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# --- AUTHENTICATION ---
@api_view(['POST'])
@permission_classes([AllowAny]) # Keep this! You need to be able to reach the login door
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user) 
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "message": "Web Login Successful",
            "token": token.key,
            "user": username
        }, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({"message": "Logged out"}, status=status.HTTP_200_OK)