from django.db import models
import uuid


class EditSession(models.Model):
    secret = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    server_id = models.UUIDField(editable=False)
    yaml_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
