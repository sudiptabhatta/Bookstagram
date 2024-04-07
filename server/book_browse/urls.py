from django.urls import path
from . import views

urlpatterns = [
    path('photo/upload/', views.BookPhotoUploadView.as_view(), name='book-photo-upload'),
    path('timeline/', views.Timeline.as_view(), name='timeline'),
]
