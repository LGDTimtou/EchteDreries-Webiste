from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import EditSession
import urllib.parse
from editor.util import group_name_from_server_id
from editor.session_timeout import start_session_timer, cancel_session_timer


class PluginConsumer(JsonWebsocketConsumer):
    def connect(self):
        query_string = self.scope["query_string"].decode("utf-8")
        self.server_id = self._get_server_id_from_query_string(query_string)

        if not self.server_id:
            return

        self.group_name = group_name_from_server_id(self.server_id)
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name,
        )
        self.accept()

        minutes = 30
        start_session_timer(
            str(self.server_id),
            minutes * 60,
            lambda: self.close(code=4999),
        )

    def _get_server_id_from_query_string(self, query_string):
        query_params = urllib.parse.parse_qs(query_string)
        return query_params.get("server_id", [None])[0]

    def disconnect(self, code):
        cancel_session_timer(str(self.server_id))
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name,
        )

    def receive_json(self, content):
        action = content.get("action")

        if action == "save_enchantment":
            secret = content.get("secret")
            yaml_data = content.get("yaml")
            if not secret or yaml_data is None:
                return

            EditSession.objects.update_or_create(
                secret=secret,
                defaults={
                    "server_id": self.server_id,
                    "yaml_data": yaml_data,
                },
            )

    def send_updated_yaml(self, event):
        self.send_json(
            {
                "type": "update_yaml",
                "secret": event["secret"],
                "yaml": event["yaml"],
            }
        )
