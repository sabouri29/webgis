import requests
from django.shortcuts import render
from .models import LayerModel,UserVector
import json
from django.http import HttpResponseBadRequest, JsonResponse

from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import ensure_csrf_cookie
from .forms import UservectorForm

# Create your views here.
def map(request):
    layer=LayerModel.objects.all()
    laye=serialize('json',layer)
    context = {'data': json.dumps (laye)}

    # context={
    #     "laye":laye
    # }
    return render(request,"index.html",context)

def getdata(request):
     layer=LayerModel.objects.all()
     laye=serialize('json',layer)
     
    
     return JsonResponse({'data': json.dumps (laye)})

def addVectorToDb(request):
      form=UservectorForm()
      
     #  context = {
     #       "form":form,
     #      }
      if request.method == "POST":
           gg=json.loads(request.body)
           user_id1=request.user.id
           wkt1=gg
           geometry=gg
           new_serVector=UserVector(user_d=user_id1,wkt=wkt1,geojson=geometry)
           new_serVector.save()
           return JsonResponse({'success':True})
      else:
          
           return render(request,"index.html",{"form": form})
      

     
def GetVectorFromDB(request):
      vectors=UserVector.objects.filter(user_d=request.user.id).values()
#     json_data= json.dumps(list(vectors.values()),cls=DjangoJSONEncoder)
#     response=HttpResponse(json_data,content_type='application/json')
#     return  response
      data_list=list(vectors)
     #  print(data_list)
      return JsonResponse(data_list,safe=False)




# def jsonreqmap(request):
#         layer=LayerModel.objects.all()
#         json_data=serialize('json',layer)
#         python_data=json.loads(json_data)
#         # modified_json_data=json.dump(python_data)
#      return render(request,"index.html",context)

def virayeshVector(request):
     if request.method == "POST":
          d1=json.loads(request.body)
          d11=d1['f_id']
          # vector=UserVector.objects.filter(id=41)
          
          wkt11=d1['geojson22']
          UserVector.objects.filter(id=d11).update(wkt=wkt11,geojson=wkt11)
          return JsonResponse({'success':True})
     else:
           return render(request,"index.html")

def delete_feature(request):
     if request.method == "POST":
          d2=json.loads(request.body)
          # d12=d2['f_id']
          # print(d2)
          # vector=UserVector.objects.filter(id=d11)
          UserVector.objects.filter(id=d2).delete()
          return JsonResponse({'success':True})
     else:
           return render(request,"index.html")
     
def Identify(request):
       url = request.body
     #   response1=requests.get(url)
     #   print(response1)
       r={"k":"l"}
       return JsonResponse(r,safe=False)


     #  vectors=UserVector.objects.filter(user_d=request.user.id).values()
#     json_data= json.dumps(list(vectors.values()),cls=DjangoJSONEncoder)
#     response=HttpResponse(json_data,content_type='application/json')
#     return  response
      
     #  print(url)
     #  return JsonResponse(k,safe=False)
