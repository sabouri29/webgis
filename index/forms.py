from django import forms
# from .models import UserVector

# class UservectorForm(forms.ModelForm):
#     class Meta:
#         model =UserVector
#         fields = ["owner","code"]

class UservectorForm(forms.Form):
   
    owner = forms.CharField(max_length=100)
    code = forms.IntegerField()