from django.urls import path
from . import views

urlpatterns = [
    path('photo/upload/', views.BookPhotoUploadView.as_view(), name='book-photo-upload'),
    path('profile/<username>/', views.Profile.as_view(), name='profile'),
    path('b/<int:book_id>/', views.UserBookPhotoRetrieveView.as_view(), name='bookphoto-detail'),
    path('<int:book_id>/', views.CurrentUserBookPhotoUpdateDeleteView.as_view(), name='bookphoto-update-detail'),
    path('profile_picture/<str:username>/', views.UserProfilePictureUpdateDeleteView.as_view(), name='profilepicture-update'),
    path('users/', views.UserSearchView.as_view(), name='user-search'),
    path('book/<int:book_id>/comment/', views.Comment.as_view(), name='comment'),
    path('book/<int:book_id>/rate/', views.RateBookPhotoView.as_view(), name='rate-book'),
    path('follow-unfollow/', views.UserFollowUnfollowView.as_view(), name='user-follow-unfollow'),
    path('followers/<str:username>/', views.UserFollowerListView.as_view(), name='user-followers'),
    path('following/<str:username>/', views.UserFollowingListView.as_view(), name='user-following'),
]