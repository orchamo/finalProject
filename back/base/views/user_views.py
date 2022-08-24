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

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        # token['userrole'] = user.User_Role
        # ...
 
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def add_user(request):
    User.objects.create_user(username=request.data['username'],
                                 email=request.data['email'],
                                 password=request.data['pwd'],is_staff=False)

    return JsonResponse({"user created":request.data['username']} )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_role(request):
    user = request.user
    print(user)
    role = User_Roles.objects.get(role_name=request.data["role"])
    try:
        user.user_role_id = role
        user.save()
    except Exception as e:
        print (e)
        return JsonResponse({"Role assigned already" : "invalid role"})
    return JsonResponse("role assigned", safe = False )

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    try:
        temp_object = User.objects.get(id = request.data['id'])
        temp_object.delete()
        return JsonResponse({"user delete":"succesful"}) 
    except Exception as e:
        print(e)
        return JsonResponse({"user delete" : "failed"})

@api_view (['PUT'])
def update_user_details(request):
    # username email password
    user = User.objects.get(id = request.data['id'])
    
    if request.data['new username'] == '':
        pass
    else:
        user.username = request.data['new username']
        user.save()

    if request.data['new password'] == '':
        pass
    else:
        user.password = request.data['new password']
        user.save()

    if request.data['new username'] == '':
        pass
    else:
        user.email = request.data['new email']
        user.save()
    
    user.save()

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','user_role_id')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_users(request):
    serializer =  UserSerializer(User.objects.all(), many = True)
    return JsonResponse({"all users": serializer.data})