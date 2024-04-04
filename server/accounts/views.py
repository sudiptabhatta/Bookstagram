from django.shortcuts import render
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import SignupSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

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
