from oauth2_provider.models import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken
    
def get_jwt_by_token(access_token):
    try:
        token = AccessToken.objects.get(token=access_token)
        user = token.user
        if user:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            return {
                'refresh': str(refresh),
                'access': str(access_token),
            }
    except AccessToken.DoesNotExist:
        return {'error': 'Invalid access token'}
