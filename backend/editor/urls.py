from django.urls import path
from .views import load_enchant, update_enchant

urlpatterns = [
    path("load", load_enchant),
    path("update", update_enchant),
]
