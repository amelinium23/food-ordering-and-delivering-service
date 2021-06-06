# Generated by Django 3.1.7 on 2021-06-06 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210528_2210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='account_type',
            field=models.IntegerField(choices=[(1, 'Normal'), (2, 'Delivery'), (3, 'Restaurant'), (4, 'Admin')], default=1),
        ),
    ]
