from rest_framework import serializers
from .models import Profile


class ProductsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
