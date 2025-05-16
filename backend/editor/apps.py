import atexit
from django.apps import AppConfig
from django.contrib.auth import get_user_model
import os


class EditorConfig(AppConfig):
    name = "editor"

    def ready(self):
        atexit.register(self.cleanup_sessions)

        User = get_user_model()
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if (
            username
            and email
            and password
            and not User.objects.filter(username=username).exists()
        ):
            User.objects.create_superuser(
                username=username, email=email, password=password
            )

    @staticmethod
    def cleanup_sessions():
        from editor.models import EditSession

        try:
            print("Cleaning up EditSession entries on shutdown...")
            EditSession.objects.all().delete()
        except:
            print("EditSession table does not exist, skipping cleanup.")
