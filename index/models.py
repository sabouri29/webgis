from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _

class SiteUser(models.Model):
    is_staff = models.BooleanField(default=False,verbose_name='کارمند')
    is_active = models.BooleanField(default=True,verbose_name='فعال')
    name = models.CharField(_("نام کاربری"), max_length=100,unique=True, help_text='منحصر به فرد')
    email = models.EmailField(_("آدرس الکترونیکی"), max_length=254,unique=True)
    class Meta:
        managed = True
        db_table = 'siteuser'
    def __str__(self):
        return self.name   

class LayerModel(models.Model):
   
    en_name = models.CharField(max_length=50)
    fa_name = models.CharField(max_length=50)
    url = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'layers'
    def __str__(self):
        return self.fa_name   

class UserVector(models.Model):
    
    
    wkt=models.CharField(max_length=1000)
    geojson=models.CharField(max_length=1000)
    user_d=models.IntegerField(blank=True, null=True)
    owner=models.CharField(max_length=1000,blank=True, null=True)
    code=models.IntegerField(blank=True, null=True)

    class Meta:
        managed =True
        db_table = 'uservectors'
   
