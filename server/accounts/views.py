from django.shortcuts import render
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import SignupSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .tokens import create_jwt_pair_for_user
from django.contrib.auth import authenticate


# Create your views here.
class SignupView(APIView):
    permission_classes = []
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = SignupSerializer


    def post(self, request: Request, format=None):
        data = request.data 

        serializer = SignupSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            response = {
                "message": "Account is created successfully.",
                "data": serializer.data 
            }

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):

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
        
        return Response(data={"message": "Invalid email or password"})




