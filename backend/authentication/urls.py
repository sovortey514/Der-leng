from django.urls import path
from . import views
from .views import UserLogin, UserRegister, CurrentUserView, SocialLoginView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.index, name='index'),
    path('users/register', UserRegister.as_view(), name='user_register'),
    path('users/login', UserLogin.as_view(), name='user_login'),
    path('user', CurrentUserView.as_view(), name='user_detail'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh_token', TokenRefreshView.as_view(), name='token_refresh'),
    path('social_login', SocialLoginView.as_view(), name ='social_login'),
]