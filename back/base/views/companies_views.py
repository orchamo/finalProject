from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Airline_Companies,Countries,User_Roles, Administrators,Customers, Flights, Tickets
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import user_passes_test
User = get_user_model()

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def assign_company_details(request):
    user = User.objects.get(username = request.data["username"] )
    country = Countries.objects.get(name = request.data["country"])
    name = request.data["companyname"]
    try :
        Airline_Companies.objects.create(name = name, country_id = country, user_id = user)
    except Exception as e:
        print (e)
        return JsonResponse({"user already assigned as a company" : "cannot comply"})
    return JsonResponse({"company registered" : "enjoy"})

@api_view (['PUT'])
def update_company_details(request):
    company = Airline_Companies.objects.get(id = request.data['id'])
    user = request.user
    country = Countries.objects.get(name = request.data['newcountry'])

    if request.data['new country'] == '':
        pass
    else:
        company.country_id = country.id
        company.save()

    if request.data['new name'] == '':
        pass
    else:
        company.name = request.data['new name']
        user.first_name = request.data['new name']
        company.save()
        user.save()

class AirlineCompaniesSerializer(ModelSerializer):
    class Meta:
        model = Airline_Companies
        fields = '__all__'

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_airlines(request):
    serializer =  AirlineCompaniesSerializer(Airline_Companies.objects.all(), many = True)
    return JsonResponse({"all airline user profiles": serializer.data})

@api_view(['POST'])
def tests(request):
    Airline_Companies.objects.create(name = 'lela', country_id = Countries.objects.get(name ='Israel'), user_id = User.objects.get(username = 'lea'))
    return Response("promoted")