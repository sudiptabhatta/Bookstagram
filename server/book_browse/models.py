from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

User = get_user_model()

# Create your models here.
class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books')
    caption = models.CharField(max_length=255)
    description = models.TextField()
    book_image = models.ImageField(_("BookImage"), upload_to='book_images')
    created = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return '%s - %s' % (self.book_id, self.user.username)
    
    class Meta:
        ordering = ["-created"]


class BookPhotoComment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return '%s - %s' % (self.book_id, self.comment_user.username)
    



class Rating(models.Model):
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='rating')
    rating_user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    rating = models.PositiveIntegerField(choices=((1, '1 star'), (2, '2 stars'), (3, '3 stars'), (4, '4 stars'), (5, '5 stars')))
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.rating_user}'s {self.rating} star rating for {self.book_id}"