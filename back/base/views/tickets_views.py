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
@permission_classes([IsAuthenticated])
def book_ticket(request):
    # user = User.objects.get(user = request.user.id )
    print(request.data)
    print(request.data["user_id"])
    user = User.objects.get(id = request.data["user_id"] )
    print(user.id)
    customer = Customers.objects.get(user_id = user.id)
    flight = Flights.objects.get(id = request.data["id"])
    print(flight.id)
    try:
        Tickets.objects.create(customer_id = customer.id , flight_id = flight.id)
        flight.remaining_tickets -= 1
        flight.save()
        if flight.remaining_tickets == -1:
            return JsonResponse({"not able to book ": "no tickets remaining"})
    except Exception as e:
        print(e)   
        return JsonResponse({"not able to book ": "try again"})
    return JsonResponse({"flight booked succesfuly ": "enjoy your trip"})

@api_view(["GET"])
def ticket_by_flight_and_customer_id(request):
    customer = Customers.objects.get(user_id = request.user_id)
    ticket = Tickets.objects.get(customer_id = customer.id, flight_id = request.flight_id)
    return Response(ticket.id)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_ticket(request,id):
    print(id)
    ticket = Tickets.objects.get(id = id)
    try:
        ticket.delete()
        return JsonResponse({"ticket delete": "success"})
    except Exception as e:
        print(e)
        return JsonResponse({"ticket delete" : "failed"})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_ticker_by_user_and_flight(request):
    customer = Customers.objects.get(user_id = request.query_params.get('user_id'))
    flight_id = request.query_params.get('flight_id')
    flight = Flights.objects.get(id = flight_id)
    flight.remaining_tickets +=1
    flight.save()
    ticket = Tickets.objects.get(customer_id = customer.id, flight_id = flight_id)
    try:
        ticket.delete()
        return Response('ticket deleted')
    except Exception as e:
        print(e)
        return Response('unable to delete')

@api_view (['PUT'])
@permission_classes([IsAuthenticated])
def update_ticket_details(request):
    ticket = Tickets.objects.get(id = request.data['id'])
    customer = Customers.objects.get(id = request.data['id'])

    if ticket == '' :
        pass
    else:
        ticket.customer_id = customer.id


class TicketsSerializer(ModelSerializer):
    class Meta:
        model = Tickets
        fields = '__all__'

    # def get_tickets_by_customer(self, customer_id):
    #     tickets = Tickets.objects.get(customer_id = customer_id)
    #     tickets_arr= []
    #     for ticket in tickets:
    #         flight = Flights.objects.get(id = tickets.flight_id)
    #         tickets_arr.append({

    #         })

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_tickets(request):
    serializer =  TicketsSerializer(Tickets.objects.all(), many = True)
    return JsonResponse({"all tickets listed": serializer.data})

#VIEW FOR CUSTOMER
#--------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_customer_tickets(request, id):
    user = Customers.objects.get(user_id = id)
    tickets = user.tickets_set.all()
    serializer =  TicketsSerializer(tickets, many = True)
    return JsonResponse({"your ticket bookings": serializer.data})