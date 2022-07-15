
from urllib import request
from rest_framework.response import Response

from django.http import HttpResponse, JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Users
from base.models import Countries
from base.models import User_Roles

def Index(request):
    return HttpResponse("test")

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


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token',
#         '/api/token/refresh',
#     ]
 
#     return Response(routes)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def addRole(request):
    # user = request.user
    try:
        User_Roles.objects.create(Role_Name=request.data['role'])
    except:
        return Response({'Role already exist'})
    return Response({'New Role added'})

@api_view(['POST'])
def addCountry(request):
    try:
        Countries.objects.create(name=request.data['name'])
    except:
        return Response({'Country already in DB'})
    return Response({'New Country added'})


@api_view(['POST'])
def addUser(request):
    User.objects.create_user(username=request.data['username'],
                                 email=request.data['email'],
                                 password=request.data['pwd'],is_staff=True)

    return JsonResponse({"user created":request.data['username']} )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assignRole(request):
    user = request.user
    try:
        Users.objects.create(user=user,
                            User_Role = User_Roles["Aviation Company"] )
    except:
        return JsonResponse({"Role assigned already" : "invalid role"})
    return JsonResponse({"role assigned"} )


