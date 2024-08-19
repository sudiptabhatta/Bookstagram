from django.contrib import admin
from .models import Book, BookPhotoComment, Rating

# Register your models here.
admin.site.register(Book)
admin.site.register(BookPhotoComment)
admin.site.register(Rating)
