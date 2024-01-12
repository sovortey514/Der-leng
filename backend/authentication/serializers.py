from rest_framework import serializers
from django.db.models import Q

from .models import User
from derleng.models import Profile_image

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
        fields = ['id', 'username', 'email', 'fullname']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        image = self.get_profile_images(instance)
        data.update(image)
        return data
    
    def get_profile_images(self, user):
        images = {'profile_image': None, 'cover_image': None}
        
        profile_image = Profile_image.objects.filter(Q(user=user) & Q(is_active=True) & Q(type='profile')).first()
        if profile_image:
            images['profile_image'] = profile_image.image.url 

        cover_image = Profile_image.objects.filter(Q(user=user) & Q(is_active=True) & Q(type='cover')).first()
        if cover_image:
            images['cover_image'] = cover_image.image.url
        return images
