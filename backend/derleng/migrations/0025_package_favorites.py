# Generated by Django 5.0.1 on 2024-03-18 13:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0024_review_booking_details'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='package',
            name='favorites',
            field=models.ManyToManyField(blank=True, null=True, related_name='package_favorites', to=settings.AUTH_USER_MODEL),
        ),
    ]
