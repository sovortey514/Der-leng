import uuid
from django.db import models

# Create your models here.
class User_role (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
    
class User (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    role_id = models.ForeignKey(User_role, on_delete=models.CASCADE)
    username = models.CharField(max_length=30)
    fullname = models.CharField(max_length=40)
    email = models.EmailField(max_length=254)
    Phone = models.CharField(max_length=10)
    password = models.CharField(max_length=20)
    last_login = models.TimeField(editable=True)
    is_active = models.BooleanField()
    created_at = models.TimeField(auto_now_add=True)

class Profile_picture (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    is_active = models.BooleanField()
    created_at = models.TimeField(auto_now_add=True)

class Category (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=30)
    
class Package (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    description = models.CharField(max_length=100)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    discount = models.FloatField()
    location_coordination = models.CharField(max_length=100)
    video_url = models.CharField(max_length=100)
    
class Package_image (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    uri_image = models.CharField(max_length=100)
    
class Package_schedule (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    destination = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
class package_service (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=100)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    price = models.FloatField()
    
class Payment_method (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    type = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    number = models.BigIntegerField()
    expire_date = models.TimeField()
    cvv = models.IntegerField()
    
class Cart (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    service_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    customer_ammount = models.IntegerField()
    booking_date = models.TimeField()
    created_at = models.TimeField(auto_now_add=True)
    
class Booking (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    cart_id = models.ForeignKey(Cart, on_delete=models.CASCADE)
    is_accept = models.BooleanField()
    created_at = models.TimeField(auto_now_add=True)
    
class Review (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    package_id = models.ForeignKey(Package, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[5, 0])
    comment = models.CharField(max_length=100)
    created_at = models.TimeField(auto_now_add=True)
    
class Thumbnail (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=50)
    uri_image = models.CharField(max_length=50)
    order_number = models.IntegerField()