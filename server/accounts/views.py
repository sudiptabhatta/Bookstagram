from django.shortcuts import render
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import SignupSerializer, LogoutSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .tokens import create_jwt_pair_for_user
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class SignupView(APIView):
    permission_classes = []
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = SignupSerializer


    def post(self, request: Request, format=None):
        data = request.data 

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()

            response = {
                "message": "Account is created successfully.",
                "data": serializer.data 
            }

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(TokenObtainPairView):

    permission_classes = []
    
    def post(self, request: Request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:

            tokens = create_jwt_pair_for_user(user)
            response = {
                "message": "Login Successful",
                "tokens": tokens
            }

            return Response(data=response, status=status.HTTP_200_OK)
        
        return Response(data={"message": "Invalid email or password"}, status=status.HTTP_404_NOT_FOUND)



class LogoutView(APIView):

    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        data = request.data # retrieve data sent by the user 

        print(data)

        serializer = self.serializer_class(data=data) # pass the data to the serializer for validation and further processing

        if serializer.is_valid():
            refresh = serializer.validated_data['refresh']

            try:
                RefreshToken(refresh).blacklist()
            except TokenError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response(status=status.HTTP_204_NO_CONTENT)


