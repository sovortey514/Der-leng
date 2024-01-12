import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User_role (models.Model):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=50)

class User(AbstractUser):
    id = models.UUIDField(
            primary_key = True,
            default = uuid.uuid4,
            editable = False)
    fullname = models.CharField(max_length=60)
    role = models.ForeignKey(User_role, on_delete=models.SET_DEFAULT, default=None, null=True, blank=True)
    phone = models.CharField(max_length=15)
    registration_method = models.CharField(max_length=10, default='email',
        choices=(
        ('email', 'email'),
        ('google', 'google'),
        ('facebook', 'facebook'),
    ))