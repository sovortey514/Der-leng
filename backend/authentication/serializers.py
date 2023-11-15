from rest_framework import serializers

from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validate_data):
        user_obj = User.objects.create_user(username=validate_data['username'], password=validate_data['password'])
        user_obj.email = validate_data['email']
        user_obj.first_name = validate_data.get('first_name', '')
        user_obj.last_name = validate_data.get('first_name', '')
        user_obj.save()
        return user_obj
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name'] 