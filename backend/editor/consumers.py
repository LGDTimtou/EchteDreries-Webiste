from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import EditSession
import uuid
import threading
from editor.util import group_name_from_secret
from editor.session_timeout import start_session_timer, cancel_session_timer


class PluginConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.secret = uuid.uuid4()
        self.group_name = group_name_from_secret(self.secret)
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name,
        )
        self.accept()

        minutes = 30
        start_session_timer(
            str(self.secret),
            minutes * 60,
            lambda: self.close(code=4999),
        )

    def disconnect(self, code):
        cancel_session_timer(str(self.secret))
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name,
        )

        try:
            session = EditSession.objects.get(secret=self.secret)
            session.delete()
        except EditSession.DoesNotExist:
            pass

    def receive_json(self, content):
        action = content.get("action")

        if action == "start_session":
            yaml_data = content.get("yaml")
            if not yaml_data:
                return
            EditSession.objects.create(secret=self.secret, yaml_data=yaml_data)
            self.send_json(
                {
                    "type": "session_started",
                    "secret": str(self.secret),
                }
            )

    def send_updated_yaml(self, event):
        self.send_json(
            {
                "type": "update_yaml",
                "yaml": event["yaml"],
            }
        )
        self.disconnect(4003)
