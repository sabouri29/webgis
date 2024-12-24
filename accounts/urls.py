from django.urls import path
from . import views

app_name="accounts"
urlpatterns=[
    path('register',views.user_register,name="register"),
    path('',views.user_login,name="login"),
]