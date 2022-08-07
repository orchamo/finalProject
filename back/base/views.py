
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
from base.models import Users,Airline_Companies,Countries,User_Roles, Administrators,Customers, Flights, Tickets

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

#ADD TO CHARTS
#---------------------------------------------------------------------
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def add_role(request):
    # user = request.user
    try:
        User_Roles.objects.create(role_name=request.data['role'])
    except:
        return Response({'Role already exist'})
    return Response({'New Role added'})

@api_view(['POST'])
def add_country(request):
    try:
        Countries.objects.create(name=request.data['name'])
    except:
        return Response({'Country already in DB'})
    return Response({'New Country added'})


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
    role = User_Roles.objects.get(role_name=request.data["role"])
    try:
        Users.objects.create(user=user,
                            user_role = role )
    except Exception as e:
        print (e)
        return JsonResponse({"Role assigned already" : "invalid role"})
    return JsonResponse("role assigned", safe = False )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_company_details(request):
    user = Users.objects.get(user = request.user.id )
    country = Countries.objects.get(name = request.data["country"])
    name = request.data["company name"]
    userOb = request.user
    try :
        Airline_Companies.objects.create(name = name, country_id = country, user_id = user)
        userOb.is_staff = 1
        userOb.first_name = name
        userOb.save()
    except Exception as e:
        print (e)
        return JsonResponse({"user already assigned as a company" : "cannot comply"})
    return JsonResponse({"company registered" : "enjoy"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_administrator(request):
    user = Users.objects.get(user = request.user.id )
    first = request.data["first name"]
    last = request.data["last name"]
    userOb = request.user
    try:
        Administrators.objects.create(first_name = first, last_name = last, user_id = user)
        userOb.is_superuser = 1
        userOb.last_name = last
        userOb.first_name = first
        userOb.save()
    except Exception as e:
        print (e)
        return JsonResponse({"not able to assign ": "try again"})
    return JsonResponse({"company registered" : "enjoy"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_customer(request):
    user = Users.objects.get(user = request.user.id )
    first = request.data["first name"]
    last = request.data["last name"]
    adress = request.data["adress"]
    phone = request.data["phone"]
    credit = request.data["credit"]
    userOb = request.user
    try:
        Customers.objects.create(first_name = first, last_name = last, adress = adress,
        phone_nu = phone, credit_card_nu = credit,  user_id = user)
        userOb.last_name = last
        userOb.first_name = first
        userOb.save()
    except Exception as e:
        print (e)
        return JsonResponse({"not able to assign ": "try again"})
    return JsonResponse({"company registered" : "enjoy"})

@api_view(['POST'])
@permission_classes([IsAdminUser])
def assign_flight(request):
    airline = Airline_Companies.objects.get(user_id = request.user.id)
    origin = Countries.objects.get(name = request.data["origin"])
    destination = Countries.objects.get(name = request.data["destination"])
    departure = request.data["departure"]
    landing = request.data["landing"]
    tickets = int(request.data["tickets"])
    
    try:
        Flights.objects.create(airline_company_id = airline, origin_country_id = origin,destination_country_id = destination,
        departure_time = departure, landing_time = landing, remaining_tickets = tickets)
    except Exception as e:
        print(e)
        return JsonResponse({"not able to assign ": "try again"})
    return JsonResponse({"tickets registered" : "good luck"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_ticket(request):
    user = Users.objects.get(user = request.user.id )
    flight = Flights.objects.get(id = request.data["flight id"])

    try:
        Tickets.objects.create(customer_id = user, flight_id = flight)
        flight.remaining_tickets -= 1
        if flight.remaining_tickets == -1:
            return JsonResponse({"not able to book ": "no tickets remaining"})
    except Exception as e:
        print(e)   
        return JsonResponse({"not able to book ": "try again"})
    return JsonResponse({"flight booked succesfuly ": "enjoy your trip"})


#DELETE FROM CHART
#---------------------------------------------------------------------------------------
@api_view(['DELETE'])
def delete_role(request):
    try:
        temp_object = User_Roles.objects.get(id = request.data['id'])
        temp_object.delete()
        return JsonResponse({"role delete": "succesful"})
    except Exception as e:
        print(e)
        return JsonResponse({"role delete" : "failed"})
    
    



#SERIALIZERS
#---------------------------------------------------------------------------------------

class UserRolesSerializer(ModelSerializer):
    class Meta:
        model = User_Roles
        fields = '__all__'

class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class CountriesSerializer(ModelSerializer):
    class Meta:
        model = Countries
        fields = '__all__'

class AirlineCompaniesSerializer(ModelSerializer):
    class Meta:
        model = Airline_Companies
        fields = '__all__'

class AdministratorsSerializer(ModelSerializer):
    class Meta:
        model = Airline_Companies
        fields = '__all__'


class CustomersSerializer(ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'


class FlightsSerializer(ModelSerializer):
    class Meta:
        model = Flights
        fields = '__all__'


class TicketsSerializer(ModelSerializer):
    class Meta:
        model = Tickets
        fields = '__all__'


#VIEW ALL
#---------------------------------------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_roles(request):
    serializer =  UserRolesSerializer(User_Roles.objects.all(), many = True)
    return JsonResponse({"all role types available": serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_customers(request):
    serializer =  CustomersSerializer(Customers.objects.all(), many = True)
    return JsonResponse({"all customer user profiles": serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_airlines(request):
    serializer =  AirlineCompaniesSerializer(Airline_Companies.objects.all(), many = True)
    return JsonResponse({"all airline user profiles": serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_users(request):
    serializer =  UsersSerializer(Users.objects.all(), many = True)
    return JsonResponse({"all users": serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_admins(request):
    serializer =  AdministratorsSerializer(Administrators.objects.all(), many = True)
    return JsonResponse({"all administrators": serializer.data})

    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_tickets(request):
    serializer =  TicketsSerializer(Tickets.objects.all(), many = True)
    return JsonResponse({"all tickets listed": serializer.data})

@api_view(['GET'])
def view_all_flights(request):
    serializer =  FlightsSerializer(Flights.objects.all(), many = True)
    return JsonResponse({"all flights": serializer.data})

@api_view(['GET'])
def view_all_countries(self):
    serializer =  CountriesSerializer(Countries.objects.all(), many = True)
    return JsonResponse({"all countries": serializer.data})




#VIEW FOR AVIATION
#--------------------------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_aviation_flights(request):
    user = request.user
    flights = user.flights_set.all()
    #flights = Flights.objects.filter(airline_company_id == user.id???)
    serializer =  FlightsSerializer(flights, many = True)
    return JsonResponse({"all flights of your company": serializer.data})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_aviation_tickets(request):
    user = request.user
    tickets = user.tickets_set.all()
    serializer =  TicketsSerializer(tickets , many = True)
    return JsonResponse({"all tickets of your company": serializer.data})


#VIEW FOR CUSTOMER
#--------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_customer_tickets(request):
    user = request.user
    tickets = user.tickets_set.all()
    serializer =  TicketsSerializer(tickets, many = True)
    return JsonResponse({"your ticket bookings": serializer.data})

