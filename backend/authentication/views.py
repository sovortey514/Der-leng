from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .validations import user_validation, is_valid_email, is_valid_username
from .serializers import *

# Create your views here.
def index(request):
    return HttpResponse('Hello Dara, this is me.')

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            validate_data = user_validation(request.data)
        except ValidationError as e:
            return Response({'errrors': e}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = RegisterSerializer(data=validate_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validate_data=validate_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Invalidate user data.'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        access_token['user'] = UserSerializer(user).data

        return {
            'refresh': str(refresh),
            'access': str(access_token),
        }

    def login_user(self, request, username, password):
        user = authenticate(username=username, password=password)
        if user:
            return Response(self.get_tokens_for_user(user), status=status.HTTP_200_OK)
        else:
            return Response({'errors': 'Invalid password. Please double-check your password and try again.'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        data = request.data
        username = data.get('username', '')
        password = data.get('password', '')

        if not username or not password:
            return Response({'errors': 'Username or password can not be none.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if is_valid_username(username):
            return self.login_user(request, username, password)
        
        elif is_valid_email(username):
            find_users = User.objects.filter(email=username)

            if len(find_users) == 1:
                username = find_users[0].username
                return self.login_user(request, username, password)
            else:
                auth_users = []
                for user in find_users:
                    auth_user = authenticate(username=user.username, password=password)
                    if auth_user:
                        auth_users.append(auth_user)

                if not auth_users:
                    return Response({'errors': 'Invalid password. Please double-check your password and try again.'}, status=status.HTTP_401_UNAUTHORIZED)

                responses = [{'tokens': self.get_tokens_for_user(user), 'user': UserSerializer(user).data} for user in auth_users]
                return Response(responses, status=status.HTTP_300_MULTIPLE_CHOICES)
            
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user)
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)

from drf_social_oauth2.views import TokenView, ConvertTokenView
from .mixins import get_jwt_by_token

class SocialLoginView(ConvertTokenView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        response = super(SocialLoginView, self).post(request, *args, **kwargs)
        jwt_token = get_jwt_by_token(response.data.get('access_token', ''))
        new_data = response.data
        if jwt_token.get('access', ''):
            new_data['access_token_jwt'] = jwt_token.get('access', '')
        if jwt_token.get('refresh', ''):
            new_data['refresh_token_jwt'] = jwt_token.get('refresh', '')

        return Response(new_data, status=response.status_code)

