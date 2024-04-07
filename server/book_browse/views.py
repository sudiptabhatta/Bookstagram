from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class BookPhotoUploadView(APIView):

    serializer_class = BookSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        data = request.data 
        user = self.request.user 

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save(user=user)

            response = {
                "message": "Book Photo Uploaded Successfully.",
                "data": serializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data={"error": "Please Select a Book Photo to Upload."}, status=status.HTTP_404_NOT_FOUND)
    





