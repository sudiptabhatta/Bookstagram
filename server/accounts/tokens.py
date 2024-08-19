from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def create_jwt_pair_for_user(user: User):
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    access['username'] = user.username

    tokens = {
        "access": str(access),
        "refresh": str(refresh)
    }

    return tokens