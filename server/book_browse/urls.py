from django.urls import path
from . import views

urlpatterns = [
    path('photo/upload/', views.BookPhotoUploadView.as_view(), name='book-photo-upload'),
    path('profile/<username>/', views.Profile.as_view(), name='profile'),
    path('<int:book_id>/', views.CurrentUserBookPhotoRetrieveUpdateDeleteView.as_view(), name='bookphoto-retrieve-update-delete'),
    path('users/', views.UserSearchView.as_view(), name='user-search'),
]
