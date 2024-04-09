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
    #     return self.caption
    
    class Meta:
        ordering = ["-created"]