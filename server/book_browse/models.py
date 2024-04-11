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

    # def __str__(self) -> str:
    #     return '%s - %s' % (self.book_id, self.user.username)
    
    class Meta:
        ordering = ["-created"]


class BookPhotoComment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    # def __str__(self) -> str:
    #     return '%s - %s' % (self.book_id, self.user_id.username)