from django.urls import path
from .api_views import *

urlpatterns = [
    path('current_user_profile/', CurrentUserProfileApiView.as_view()),
]
