from rest_framework import serializers
from .models import Book, BookPhotoComment, Rating
from django.contrib.auth import get_user_model

User = get_user_model()


class BookSerializer(serializers.ModelSerializer):
    caption = serializers.CharField(max_length=255, required=False)
    description = serializers.CharField(required=False)
    # book_image = serializers.ImageField(allow_empty_file=False)

    class Meta:
        model = Book
        fields = ['book_id', 'caption', 'description', 'book_image', 'created']
        # extra_kwargs = {'book_image': {'required': True}}

    # Serializer with Dynamic required Fields
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get('request')

        if request and request.method == 'POST':
            self.fields['book_image'].required = True
        else:
            self.fields['book_image'].required = False




class UserBookPhotosSerializer(serializers.ModelSerializer):

    books = BookSerializer(many=True, read_only=True)

    class Meta:
        model = User 
        fields = ['email', 'username', 'fullname', 'profile_picture', 'books']



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'fullname', 'profile_picture']



class CommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(required=True)
    comment_user = UserSerializer(required=False) # Nesting UserSerializer within CommentSerializer

    class Meta:
        model = BookPhotoComment
        fields = ['comment_user', 'comment_id', 'comment', 'created']



class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ['description', 'rating']




class UserBookPhotoDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer() # Nesting UserSerializer within BookSerializer

    class Meta:
        model = Book
        fields = ['user', 'book_id', 'caption', 'description', 'book_image', 'created']



