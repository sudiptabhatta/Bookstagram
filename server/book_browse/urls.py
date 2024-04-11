from django.urls import path
from . import views

urlpatterns = [
    path('photo/upload/', views.BookPhotoUploadView.as_view(), name='book-photo-upload'),
    path('profile/<username>/', views.Profile.as_view(), name='profile'),
    path('b/<int:book_id>/', views.UserBookPhotoRetrieveView.as_view(), name='bookphoto-detail'),
    path('<int:book_id>/', views.CurrentUserBookPhotoUpdateDeleteView.as_view(), name='bookphoto-update-detail'),
    path('users/', views.UserSearchView.as_view(), name='user-search'),
    path('book/<int:book_id>/comment/', views.Comment.as_view(), name='comment'),
]