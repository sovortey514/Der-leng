# Generated by Django 4.2.7 on 2024-01-14 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0006_alter_package_discount_alter_package_video_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='package_service',
            name='is_close',
            field=models.BooleanField(default=False),
        ),
    ]
