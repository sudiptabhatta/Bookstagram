from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status, generics, mixins
from rest_framework.views import APIView
from .serializers import BookSerializer, UserBookPhotosSerializer, UserBookPhotoDetailSerializer, UserSerializer, CommentSerializer, RatingSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Book, BookPhotoComment, Rating
from django.contrib.auth import get_user_model
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from .permissions import IsOwnerOrReadOnly


User = get_user_model()


# class CustomPaginator(PageNumberPagination):
#     page_size = 2
#     page_query_param = "page"
#     page_size_query_param = "page_size"



# Create your views here.
class BookPhotoUploadView(APIView):

    serializer_class = BookSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        data = request.data 
        user = self.request.user 

        serializer = self.serializer_class(data=data, context={"request": 
                      request})

        if serializer.is_valid():
            serializer.save(user=user)

            response = {
                "message": "Book Photo Uploaded Successfully.",
                "bookphoto": serializer.data
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data={"error": "Please Select a Book Photo to Upload."}, status=status.HTTP_404_NOT_FOUND)
    



class Profile(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = UserBookPhotosSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs.get('username')

        return User.objects.filter(username=username)
    
    def get(self, request: Request, *args, **kwargs):
        res = self.list(request, *args, **kwargs)
        return res
    


class UserBookPhotoRetrieveView(generics.GenericAPIView, mixins.ListModelMixin):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, book_id: int, *args, **kwargs):
        book_photo = get_object_or_404(Book, pk=book_id)
        comments = BookPhotoComment.objects.filter(book_id=book_photo)
        rating = Rating.objects.filter(book_id=book_photo)

        bookPhotoSerializer = UserBookPhotoDetailSerializer(instance=book_photo, context={"request": 
                      request})
        commentSerializer = CommentSerializer(instance=comments, many=True, context={"request": 
                      request})
        ratingSerializer = RatingSerializer(instance=rating, many=True)

        response = {
            "data": bookPhotoSerializer.data,
            "bookphoto_comment": commentSerializer.data,
            "bookphoto_rating": ratingSerializer.data
        }
        return Response(data=response, status=status.HTTP_200_OK)



class CurrentUserBookPhotoUpdateDeleteView(APIView):
    serializer_class = BookSerializer
    permission_classes = [IsOwnerOrReadOnly]
    

    def put(self, request: Request, book_id: int):
        book_photo = get_object_or_404(Book, pk=book_id) 

        data = request.data 

        serializer = self.serializer_class(instance=book_photo, data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()

            response = {
                "message": "Book Photo Updated Successfully.",
                "bookphoto": serializer.data 
            }

            return Response(data=response, status=status.HTTP_200_OK)
        
        return Response(data={"error": "Please Select a Book Photo to Upload."}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, book_id: int):
        book_photo = get_object_or_404(Book, pk=book_id) 

        book_photo.delete()

        return Response(status=status.HTTP_204_NO_CONTENT) 
    



class UserSearchView(generics.ListAPIView):

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['username', 'fullname'] 
    # pagination_class = CustomPaginator




class Comment(APIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, book_id: int):
        data = request.data 
        user = self.request.user 
        book_photo = get_object_or_404(Book, pk=book_id)

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save(comment_user=user, book_id=book_photo)

            response = {
                # "comment_user": {
                #     "id": user.id,
                #     "username": user.username,
                # },
                'comment_data': serializer.data,
            }

            return Response(data=response, status=status.HTTP_201_CREATED)
        
        return Response(data={"error": "Please write a comment for this book photo."}, status=status.HTTP_404_NOT_FOUND)
    



class RateBookPhotoView(APIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, book_id: int):
        user = self.request.user 
        book_photo = get_object_or_404(Book, pk=book_id)
        data = request.data 

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save(rating_user=user, book_id=book_photo)

            response = {
                "user_id": user.id, 
                "username": user.username,
                "bookphoto_rating": serializer.data
            }

            return Response(data=response, status=status.HTTP_200_OK)
        
        return Response(data=serializer.errors, status=status.HTTP_404_NOT_FOUND)





