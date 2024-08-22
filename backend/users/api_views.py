from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.parsers import MultiPartParser, FormParser


class ProfileApiView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
