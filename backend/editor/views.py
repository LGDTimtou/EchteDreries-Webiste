from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EditSession
from django.shortcuts import get_object_or_404
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from editor.util import group_name_from_server_id
from editor.session_timeout import reset_session_timer
from rest_framework import status
import uuid


@api_view(["GET"])
def load_enchant(request):
    secret = request.GET.get("secret")
    try:
        secret = uuid.UUID(secret)
    except (ValueError, TypeError):
        return Response(
            {"error": "Invalid or missing UUID"}, status=status.HTTP_400_BAD_REQUEST
        )

    session = get_object_or_404(EditSession, secret=secret)

    reset_session_timer(secret)

    return Response({"yaml": session.yaml_data})


@api_view(["POST"])
def update_enchant(request):
    secret = request.GET.get("secret")
    session = get_object_or_404(EditSession, secret=secret)
    yaml_data = request.data.get("yaml", "")
    session.yaml_data = yaml_data
    session.save()

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        group_name_from_server_id(session.server_id),
        {
            "type": "send_updated_yaml",
            "secret": secret,
            "yaml": yaml_data,
        },
    )

    return Response({"status": "ok"})
