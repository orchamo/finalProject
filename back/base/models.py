from unittest.util import _MAX_LENGTH
from django import forms
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser



# Create your models here.


class User_Roles(models.Model):
    id = models.AutoField(primary_key=True)
    role_name = models.TextField(unique=True)

    def __str__(self):
     	   return self.role_name

class User(AbstractUser):
    user_role =  models.ForeignKey(User_Roles, on_delete= models.CASCADE, null=True)
    

class Countries(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(max_length= 50, unique=True)

    def __str__(self):
     	   return self.name

class Airline_Companies(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(max_length=100)
    country_id = models.ForeignKey(Countries, on_delete= models.CASCADE, null = True)
    user_id = models.ForeignKey(User,on_delete = models.CASCADE ,null = True)

    def __str__(self):
     	   return self.name

class Administrators(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.TextField(max_length=50)
    last_name = models.TextField(max_length= 50)
    user_id = models.ForeignKey(User,on_delete = models.CASCADE,null = True)
    
    def __str__(self):
     	   return self.first_name

class Customers(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.TextField(max_length=50)
    last_name = models.TextField(max_length= 50)
    adress = models.TextField(max_length=100)
    phone_nu= models.TextField(max_length=12, unique= True)
    credit_card_nu = models.TextField(max_length=16, unique= True)
    user_id = models.ForeignKey(User,on_delete = models.CASCADE,null = True)

    def __str__(self):
     	   return self.first_name + " " + self.last_name

class Flights(models.Model):
    id = models.BigAutoField(primary_key= True)
    airline_company = models.ForeignKey(Airline_Companies, on_delete=models.CASCADE, null=True)
    origin_country = models.ForeignKey(Countries,on_delete=models.CASCADE,null= True)
    destination_country = models.ForeignKey(Countries,on_delete=models.CASCADE, null=True, related_name='Destination_Country_Id' )
    departure_time = models.DateTimeField()
    landing_time = models.DateTimeField()
    remaining_tickets = models.IntegerField()
    price = models.IntegerField(default= 0 )

    def __str__(self):
     	   return str(self.origin_country_id) + " " + str(self.destination_country_id)

class Tickets(models.Model):
    id = models.BigAutoField(primary_key=True)
    customer = models.ForeignKey(Customers,on_delete= models.CASCADE, null= True)
    flight = models.ForeignKey(Flights,on_delete=models.CASCADE,null=True)

    class Meta:
        unique_together = [['customer_id', 'flight_id']]

    def __str__(self):
     	   return str(self.customer_id) + " " + str(self.flight_id)
    
    
