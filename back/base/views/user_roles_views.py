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

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def add_role(request):
    # user = request.user
    try:
        User_Roles.objects.create(role_name=request.data['role'])
    except:
        return Response({'Role already exist'})
    return Response({'New Role added'})

@api_view(['DELETE'])
def delete_role(request):
    try:
        temp_object = User_Roles.objects.get(id = request.data['id'])
        temp_object.delete()
        return JsonResponse({"role delete": "succesful"})
    except Exception as e:
        print(e)
        return JsonResponse({"role delete" : "failed"})

@api_view (['PUT'])
def update_role_name(request):
    role = User_Roles.objects.get(id = request.data['id'])

    role.role_name = request.data['new name']
    role.save()

class UserRolesSerializer(ModelSerializer):
    class Meta:
        model = User_Roles
        fields = '__all__'


@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_roles(request):
    serializer =  UserRolesSerializer(User_Roles.objects.all(), many = True)
    return JsonResponse({"all role types available": serializer.data})