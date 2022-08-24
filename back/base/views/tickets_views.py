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
@permission_classes([IsAuthenticated])
def book_ticket(request):
    user = User.objects.get(user = request.user.id )
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

@api_view(['DELETE'])
@staff_member_required
def delete_ticket(request):
    ticket = Tickets.objects.get(id = request.data['id'])
    try:
        ticket.delete()
        return JsonResponse({"ticket delete": "success"})
    except Exception as e:
        print(e)
        return JsonResponse({"ticket delete" : "failed"})

@api_view (['PUT'])
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

@api_view(['GET'])
@permission_classes([IsAdminUser])
def view_all_tickets(request):
    serializer =  TicketsSerializer(Tickets.objects.all(), many = True)
    return JsonResponse({"all tickets listed": serializer.data})

#VIEW FOR CUSTOMER
#--------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_customer_tickets(request):
    user = request.user
    tickets = user.tickets_set.all()
    serializer =  TicketsSerializer(tickets, many = True)
    return JsonResponse({"your ticket bookings": serializer.data})