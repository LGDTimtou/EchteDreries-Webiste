from django.urls import re_path
from .consumers import PluginConsumer

websocket_urlpatterns = [
    re_path(r"ws/plugin/$", PluginConsumer.as_asgi()),
]
