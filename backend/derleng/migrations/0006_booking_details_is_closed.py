# Generated by Django 5.0.1 on 2024-01-30 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derleng', '0005_customer_refunds_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking_details',
            name='is_closed',
            field=models.BooleanField(default=False),
        ),
    ]
