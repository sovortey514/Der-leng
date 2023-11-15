from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    registration_method = models.CharField(max_length=10, default='email',
        choices=(
        ('email', 'email'),
        ('google', 'google'),
        ('facebook', 'facebook'),
    )
    )
    role = models.CharField(max_length=30, default='customer', choices=(
        ("customer", "customer"),
        ("tour_guide", "tour_guide"),
        ("admin", "admin"),
    ))