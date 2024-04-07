from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    caption = serializers.CharField(max_length=255, required=False)
    description = serializers.CharField(required=False)
    # book_image = serializers.ImageField(allow_empty_file=False)

    class Meta:
        model = Book
        fields = ['book_id', 'caption', 'description', 'book_image', 'created']
        extra_kwargs = {'book_image': {'required': True}}
