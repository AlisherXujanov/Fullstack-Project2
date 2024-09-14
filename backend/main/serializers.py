from copyreg import constructor
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

    def save(self, **kwargs):
        images = self.context['request'].FILES.getlist('images')
        product:Products = super().save(**kwargs)
        for image in images:
            ProductImages.objects.create(product=product, image=image)
            product.images = ProductImages.objects.filter(product=product)
            product.save()
        return product