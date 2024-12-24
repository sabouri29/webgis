from django.shortcuts import render ,redirect
from .forms import UserRegistrationForm,UserLoginForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate ,login,logout
from django.contrib import messages
# Create your views here.

def user_register(request):
    if request.method=='POST':
        form=UserRegistrationForm(request.POST)
        if form.is_valid():
            cd=form.cleaned_data
            User.objects.create_user(cd['username'],cd['email'],cd['password'])
            messages.success(request,'bamova','success')
            return redirect ("accounts:login")

    else:
        form=UserRegistrationForm()
        messages.success(request,'jfghgka','success')
    return render(request,'accounts/register.html',{'form':form})


def user_login(request):
    if request.method=='POST':
        form=UserLoginForm(request.POST)
        if form.is_valid():
            cd=form.cleaned_data
            user= authenticate(request,username=cd['username'],password=cd['password'])
            if user is not None:
                login(request,user)
                messages.success(request,'gggggggggggg','success')
                return redirect ("index:index")
            else:
                 messages.error(request,'rrrrrrr','danger')
        else:  
            return render(request,'accounts/login.html',{'form':form})       
    else:
        form=UserLoginForm()             

    return render(request,'accounts/login.html',{'form':form})