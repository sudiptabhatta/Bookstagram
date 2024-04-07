from rest_framework import serializers
from .models import Book
from django.contrib.auth import get_user_model

User = get_user_model()


class BookSerializer(serializers.ModelSerializer):
    caption = serializers.CharField(max_length=255, required=False)
    description = serializers.CharField(required=False)
    # book_image = serializers.ImageField(allow_empty_file=False)

    class Meta:
        model = Book
        fields = ['book_id', 'caption', 'description', 'book_image', 'created']
        extra_kwargs = {'book_image': {'required': True}}



class CurrentUserBookPhotosSerializer(serializers.ModelSerializer):

    books = BookSerializer(many=True, read_only=True)

    class Meta:
        model = User 
        fields = ['email', 'username', 'fullname', 'profile_picture', 'books']