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
# @permission_classes([IsAdminUser])
def assign_flight(request):
    print(request.data)
    airline = Airline_Companies.objects.get(user_id = 3).id
    origin = Countries.objects.get(name = request.data["origin"]).id
    destination = Countries.objects.get(name = request.data["destination"]).id
    departure = request.data["departure"]
    landing = request.data["landing"]
    tickets = int(request.data["tickets"])
    price = int(request.data["price"])

    try:
        Flights.objects.create(airline_company_id = airline, origin_country_id = origin,destination_country_id = destination,
        departure_time = departure, landing_time = landing, remaining_tickets = tickets, price = price)
    except Exception as e:
        print(e)
        return JsonResponse({"not able to assign ": "try again"})
    return JsonResponse({"tickets registered" : "good luck"})

@api_view(['DELETE'])
# @staff_member_required
def delete_flight(request, id):
    print(id)
    flight = Flights.objects.get(id = id)
    # if request.user.id == flight.airline_company_id:
    if 1==1:
        try:
            flight.delete()
            return JsonResponse({"flight delete":"succesful"}) 
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
    
    if request.data['price'] == '':
        pass
    else:
        flight.price = request.data['price']


class FlightsSerializer(ModelSerializer):
    class Meta:
        model = Flights
        fields = '__all__'
    
    def get_all_flights(self):
        flights = Flights.objects.all()
        flights_ar =[]
        for flight in flights:
            flights_ar.append({
                "id":flight.id,
                "airline_company":flight.airline_company.name,
                "origin_country":flight.origin_country.name,
                "destination_country":flight.destination_country.name,
                "departure_time":flight.departure_time,
                "landing_time":flight.landing_time,
                "remaining_tickets":flight.remaining_tickets,
                "price":flight.price
            },)
        return flights_ar
    
    # def get_flight_by_user(self):
    #     flights = Flights.objects.filter()
    #     flights_ar =[]
    #     for flight in flights:
    #         flights_ar.append({
    #             "id":flight.id,
    #             "airline_company":flight.airline_company.name,
    #             "origin_country":flight.origin_country.name,
    #             "destination_country":flight.destination_country.name,
    #             "departure_time":flight.departure_time,
    #             "landing_time":flight.landing_time,
    #             "remaining_tickets":flight.remaining_tickets,
    #             "price":flight.price
    #         },)
    #     return flights_ar

    def get_flight_by_origin(self,origin):
        flights = Flights.objects.filter(origin_country_id = origin)
        flights_ar = []
        for flight in flights:
             flights_ar.append({
                "id":flight.id,
                "airline_company":flight.airline_company.name,
                "origin_country":flight.origin_country.name,
                "destination_country":flight.destination_country.name,
                "departure_time":flight.departure_time,
                "landing_time":flight.landing_time,
                "remaining_tickets":flight.remaining_tickets,
                "price":flight.price
            },)
        return flights_ar

    def get_flight_by_destination(self,destination):
        flights = Flights.objects.get(destination_country_id = destination)
        print(flights)
        flights_ar = []
        for flight in flights:
             flights_ar.append({
                "id":flight.id,
                "airline_company":flight.airline_company.name,
                "origin_country":flight.origin_country.name,
                "destination_country":flight.destination_country.name,
                "departure_time":flight.departure_time,
                "landing_time":flight.landing_time,
                "remaining_tickets":flight.remaining_tickets,
                "price":flight.price
            },)
        return flights_ar
    
    def get_flight_by_dest_orig(self,destination, origin):
        flights = Flights.objects.filter(destination_country_id = destination, origin_country_id = origin)
        flights_ar = []
        
        for flight in flights:
             flights_ar.append({
                "id":flight.id,
                "airline_company":flight.airline_company.name,
                "origin_country":flight.origin_country.name,
                "destination_country":flight.destination_country.name,
                "departure_time":flight.departure_time,
                "landing_time":flight.landing_time,
                "remaining_tickets":flight.remaining_tickets,
                "price":flight.price
            },)
        return flights_ar


@api_view(['GET'])
def view_all_flights(request):
    serializer =  FlightsSerializer().get_all_flights()
    return Response(serializer)
    

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def view_customer_flights(request, id):
    flightsar = []
    customer = Customers.objects.get(user_id = id)
    tickets = Tickets.objects.filter(customer = customer.id)
    for ticket in tickets:
        flight = Flights.objects.get(id = ticket.flight_id)
        flightsar.append(flight)
    serializer =  FlightsSerializer(flightsar, many = True).data
    return Response(serializer)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def view_company_flights(request, id):
    flightsar = []
    airline = Airline_Companies.objects.get(user_id = id)
    flights = Flights.objects.filter(airline_company_id = airline.id)
    for flight in flights:
        flightsar.append(flight)
    serializer =  FlightsSerializer(flightsar, many = True).data
    return Response(serializer)

# @api_view(['GET'])
# def view_flight_by_origin(request):
#     origin = Countries.objects.get(name = request.data('country'))
#     flights = Flights.objects.get(origin_country_id = origin.id)
#     serializer = FlightsSerializer(flights, many = True)
#     return JsonResponse({"all flight leaving this location" : serializer.data})

@api_view(['GET'])
def view_flight_by_origin(request):
    origin = request.query_params.get('origin')
    print(origin)
    origin = Countries.objects.get(name = origin)
    serializer = FlightsSerializer().get_flight_by_origin(origin.id)
    print(serializer)
    return Response(serializer)


#Get flights by destination country

@api_view(['GET'])
def view_flight_by_destination(request):
    print(request.query_params.get('destination'))
    destination = request.query_params.get('destination')
    destination = Countries.objects.get(name = destination)
    # flights = Flights.objects.get(destination_country_id = destination.id)
    serializer = FlightsSerializer().get_flight_by_destination(destination.id)
    print(serializer)
    return Response(serializer)

@api_view(['GET'])
def view_flight_by_dest_orig(request):
    origin = request.query_params.get('origin')
    destination = request.query_params.get('destination')
    origin = Countries.objects.get(name = origin)
    destination = Countries.objects.get(name = destination)
    serializer = FlightsSerializer().get_flight_by_dest_orig(destination.id, origin.id)
    print(serializer)
    return Response(serializer)

# @api_view(['GET'])
# def view_flight_by_date(request):
#     flights = Flights.objects.filter(departure_time__year = 2016).filter(departure_time__month = 6).filter(departure_time__day = 19)
#     serializer = FlightsSerializer(flights, many = True).data
#     print(serializer)
#     return Response(serializer)