import atexit
from django.apps import AppConfig


class EditorConfig(AppConfig):
    name = "editor"

    def ready(self):
        atexit.register(self.cleanup_sessions)

    @staticmethod
    def cleanup_sessions():
        from editor.models import EditSession

        try:
            print("Cleaning up EditSession entries on shutdown...")
            EditSession.objects.all().delete()
        except:
            print("EditSession table does not exist, skipping cleanup.")
