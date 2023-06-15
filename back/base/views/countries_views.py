from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from base.models import Countries
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


User = get_user_model()

@api_view(['GET'])
def view_all_countries(request):
    serializer =  CountriesSerializer().get_all_countries()
    return Response(serializer)

@api_view(['GET'])
def view_one_country(self, id):
    serializer =  CountriesSerializer(Countries.objects.get(id = id), many = True)
    return JsonResponse({"country requested": serializer.data})


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

class CountriesSerializer(serializers.ModelSerializer):
    country_name = serializers.StringRelatedField()
    class Meta:
        model = Countries
        fields = '__all__'

    def get_all_countries(self):
        countries = Countries.objects.all()
        countries_ar = []
        for country in countries:
            countries_ar.append({
                "id": country.id,
                "name" : country.name
            },)
        return countries_ar
    
    