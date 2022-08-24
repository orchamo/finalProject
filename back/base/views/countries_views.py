from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from base.models import Countries
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer


User = get_user_model()

@api_view(['GET'])
def view_all_countries(self):
    serializer =  CountriesSerializer(Countries.objects.all(), many = True)
    return JsonResponse({"all countries": serializer.data})

@api_view(['POST'])
def add_country(request):
    try:
        Countries.objects.create(name=request.data['name'])
    except:
        return Response({'Country already in DB'})
    return Response({'New Country added'})

@api_view(['DELETE'])
def delete_country(request):
    try:
        temp_object = Countries.objects.get(id = request.data['id'])
        temp_object.delete()
        return JsonResponse({"country delete":"succesful"})
    except Exception as e:
        print(e)
        return JsonResponse({"country delete" : "failed"})

@api_view (['PUT'])
def update_country_name(request):
    country = Countries.objects.get(id = request.data['id'])

    country.name = request.data['new name']
    country.save()

class CountriesSerializer(ModelSerializer):
    class Meta:
        model = Countries
        fields = '__all__'