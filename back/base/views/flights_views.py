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

@api_view(['DELETE'])
@staff_member_required
def delete_flight(request):
    flight = Flights.objects.get(id = request.data['id'])
    if request.user.id == flight.airline_company_id:
        try:
            flight.delete()
            return JsonResponse({"flght delete":"succesful"}) 
        except Exception as e:
            print(e)
            return JsonResponse({"flight delete" : "failed"})
    else:
        return JsonResponse({"access denied" : "thats not your flight"})

@api_view (['PUT'])
def update_flight_details(request):
    flight = Flights.objects.get(id = request.data['id'])
    origin = Countries.objects.get(name = request.data['new origin'])
    destination = Countries.objects.get(name = request.data['new destination'])

    if request.data['new origin'] == '':
        pass
    else:
        flight.origin_country_id = origin.id
        flight.save()
    
    if request.data['new destination'] == '':
        pass
    else:
        flight.destiantion_country_id = destination.id
        flight.save()

    # change departure time
    # change lading time

    if request.data['tickets amount'] == '':
        pass
    else:
        flight.remaining_tickets = request.data['tickets amount']


class FlightsSerializer(ModelSerializer):
    class Meta:
        model = Flights
        fields = '__all__'

@api_view(['GET'])
def view_all_flights(request):
    serializer =  FlightsSerializer(Flights.objects.all(), many = True)
    return JsonResponse({"all flights": serializer.data})

#view all flight related to company
@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_aviation_flights(request):
    user = request.user
    flights = user.flights_set.all()
    #flights = Flights.objects.filter(airline_company_id == user.id???)
    serializer =  FlightsSerializer(flights, many = True)
    return JsonResponse({"all flights of your company": serializer.data})

#Get flights by origin country

@api_view(['GET'])
def view_flight_by_origin(request):
    origin = Countries.objects.get(name = request.data('country'))
    flights = Flights.objects.get(origin_country_id = origin.id)
    serializer = FlightsSerializer(flights, many = True)
    return JsonResponse({"all flight leaving this location" : serializer.data})

#Get flights by destination country

@api_view(['GET'])
def view_flight_by_destination(request):
    destination = Countries.objects.get(name = request.data('country'))
    flights = Flights.objects.get(destination_country_id = destination.id)
    serializer = FlightsSerializer(flights, many = True)
    return JsonResponse({"all flight arriving to this destination" : serializer.data})