# Generated by Django 5.0.2 on 2025-05-06 18:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("editor", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="editsession",
            name="player",
        ),
    ]
