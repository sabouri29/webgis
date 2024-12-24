from django.urls import path
from . import views

app_name="index"
urlpatterns=[
    path('',views.map,name="index"),
    path('getdata',views.getdata,name='getdata'),
     path('addVectorToDb',views.addVectorToDb,name='addVectorToDb'),
     path('GetVectorFromDB',views.GetVectorFromDB,name='GetVectorFromDB'),
     path('virayeshVector',views.virayeshVector,name='virayeshVector'),
     path('delete_feature',views.delete_feature,name='delete_feature'),
     path('Identify',views.Identify,name='Identify'),
]