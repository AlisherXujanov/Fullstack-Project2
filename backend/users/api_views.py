from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import ProductsSerializer
from .models import Products
from rest_framework.parsers import MultiPartParser, FormParser


class ProductsApiView(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
