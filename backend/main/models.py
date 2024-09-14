from django.db import models
from PIL import Image

class ProductImages(models.Model):
    product = models.ForeignKey('Products', related_name='product_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/', default='products/default.jpg')
    
    def __str__(self):
        return self.product.name
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)
            
    class Meta:
        verbose_name = 'Product Image'
        verbose_name_plural = 'Product Images'
        
        
    

# Clone of AliExpress products
class Products(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    owner = models.ForeignKey('auth.User', default=1, related_name='products',
                              on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    images = models.ManyToManyField(ProductImages, related_name='products', blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.price < 0:
            raise ValueError("Price cannot be negative")
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
