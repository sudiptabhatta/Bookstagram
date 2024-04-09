from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import BookSerializer, CurrentUserBookPhotosSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Book


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
    


# current user timeline
class Timeline(APIView):
    serializer_class = CurrentUserBookPhotosSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):

        user = self.request.user 

        serializer = CurrentUserBookPhotosSerializer(instance=user)

        # print(serializer.data)

        return Response(data=serializer.data, status=status.HTTP_200_OK)




class CurrentUserBookPhotoRetrieveUpdateDeleteView(APIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, book_id: int):
        book_photo = get_object_or_404(Book, pk=book_id)

        serializer = self.serializer_class(instance=book_photo)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
    

    def put(self, request: Request, book_id: int):
        book_photo = get_object_or_404(Book, pk=book_id) 

        data = request.data 

        serializer = self.serializer_class(instance=book_photo, data=data)

        if serializer.is_valid():
            serializer.save()

            response = {
                "message": "Book Photo Updated Successfully.",
                "data": serializer.data 
            }

            return Response(data=response, status=status.HTTP_200_OK)
        
        return Response(data={"error": "Please Select a Book Photo to Upload."}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, book_id: int):
        book_photo = get_object_or_404(Book, pk=book_id) 

        book_photo.delete()

        return Response(status=status.HTTP_204_NO_CONTENT) 