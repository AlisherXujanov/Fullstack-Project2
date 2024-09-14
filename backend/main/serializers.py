from rest_framework import serializers
from .models import ProductImages, Products



class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = "__all__"


class ProductsSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, read_only=True)
    
    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'price', 'images', 'url']
