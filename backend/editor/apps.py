import atexit
from django.apps import AppConfig


class EditorConfig(AppConfig):
    name = "editor"

    def ready(self):
        atexit.register(self.cleanup_sessions)

    @staticmethod
    def cleanup_sessions():
        from editor.models import EditSession

        print("Cleaning up EditSession entries on shutdown...")
        EditSession.objects.all().delete()
