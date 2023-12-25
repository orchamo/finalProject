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
def assign_customer(request):
    user = User.objects.get(username = request.data["username"] )
    first = request.data["firstname"]
    last = request.data["lastname"]
    adress = request.data["adress"]
    phone = request.data["phone"]
    credit = request.data["credit"]
    try:
        Customers.objects.create(first_name = first, last_name = last, adress = adress,
        phone_nu = phone, credit_card_nu = credit,  user_id = user)
        user.last_name = last
        user.first_name = first
        user.save()
    except Exception as e:
        print (e)
        return Response("not able to assign, try again")
    return Response("company registered,  enjoy")

@api_view (['PUT'])
def update_customer_details(request):
    customer = Customers.objects.get(id = request.data['id'])
    user = request.user
    
    if request.data['new first name'] == '':
        pass
    else:
        customer.country = request.data['new first name']
        user.first_name = request.data['new first name']
        customer.save()
        user.save()
    
    if request.data['new last name'] == '':
        pass
    else:
        customer.country = request.data['new last name']
        user.last_name = request.data['new last name']
        customer.save()
        user.save()
        
    if request.data['new adress'] == '':
        pass
    else:
        customer.country = request.data['new adress']
        customer.save()

    if request.data['new phone'] == '':
        pass
    else:
        customer.country = request.data['new phone']
        customer.save()
    
    if request.data['new credit'] == '':
        pass
    else:
        customer.country = request.data['new credit']
        customer.save()


class CustomersSerializer(ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'


@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_customers(request):
    serializer =  CustomersSerializer(Customers.objects.all(), many = True)
    return JsonResponse({"all customer user profiles": serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_one_customer(request, id):
    serializer =  CustomersSerializer(Customers.objects.get(user_id = id), many = True)
    return JsonResponse({f"{serializer.first_name} data is ": serializer.data})