from django.contrib import admin
from .models import LayerModel,UserVector,SiteUser
# Register your models here.
admin.site.register(LayerModel)
admin.site.register(UserVector)
admin.site.register(SiteUser)