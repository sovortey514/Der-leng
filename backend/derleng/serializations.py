from .models import *
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password' ,)
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id' , 'username' , 'fullname')        
        
class Profile_imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile_image
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'
        
class Package_imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_image
        fields = '__all__'
        
class Package_scheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_schedule
        fields = '__all__'
        
class Package_scheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package_schedule
        fields = '__all__'
    
class Package_serviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = package_service
        fields = '__all__'
        
class Payment_methodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_method
        fields = '__all__'
        
        
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = '__all__'
        
