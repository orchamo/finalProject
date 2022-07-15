from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User_Roles(models.Model):
    id = models.AutoField(primary_key=True)
    Role_Name = models.TextField(unique=True)

    def __str__(self):
     	   return self.Role_Name

class Users(models.Model):
    user =models.OneToOneField( User,on_delete=models.CASCADE)
    User_Role = models.ForeignKey(User_Roles, on_delete= models.SET_NULL, null=True)
    _id=models.AutoField(primary_key=True,editable=False, null= False)

    def __str__(self):
     	   return self.user.username

class Countries(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(max_length= 50, unique=True)

    def __str__(self):
     	   return self.name

class Airline_Companies(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField(max_length=100)
    Country_Id = models.ForeignKey(Countries, on_delete= models.SET_NULL, null = True)
    User_Id = models.ForeignKey(Users,on_delete = models.SET_NULL,null = True)

    def __str__(self):
     	   return self.name

class Administrators(models.Model):
    id = models.BigAutoField(primary_key=True)
    First_Name = models.TextField(max_length=50)
    Last_Name = models.TextField(max_length= 50)
    User_Id = models.ForeignKey(Users,on_delete = models.SET_NULL,null = True)

    def __str__(self):
     	   return self.First_Name

class Customers(models.Model):
    id = models.BigAutoField(primary_key=True)
    First_Name = models.TextField(max_length=50)
    Last_Name = models.TextField(max_length= 50)
    Adress = models.TextField(max_length=100)
    Phone_NU= models.TextField(max_length=12, unique= True)
    Credit_Card_Nu = models.TextField(max_length=16, unique= True)
    User_Id = models.ForeignKey(Users,on_delete = models.SET_NULL,null = True)

    def __str__(self):
     	   return self.First_Name + " " + self.Last_Name

class Flights(models.Model):
    id = models.BigAutoField(primary_key= True)
    Airline_Company_Id = models.ForeignKey(Airline_Companies, on_delete=models.SET_NULL, null=True)
    Origin_Country_Id = models.ForeignKey(Countries,on_delete=models.SET_NULL,null= True)
    Destination_Country_Id = models.ForeignKey(Countries,on_delete=models.SET_NULL, null=True, related_name='Destination_Country_Id' )
    Departure_Time = models.DateTimeField()
    Landing_Time = models.DateTimeField()
    Remaining_Tickets = models.IntegerField()

    def __str__(self):
     	   return self.Origin_Country_Id + " " + self.Destination_Country_Id

class Tickets(models.Model):
    id = models.BigAutoField(primary_key=True)
    Customer_Id = models.ForeignKey(Customers,on_delete= models.SET_NULL, null= True)
    Flight_Id = models.ForeignKey(Flights,on_delete=models.SET_NULL,null=True)

    class Meta:
        unique_together = [['Customer_Id', 'Flight_Id']]

    def __str__(self):
     	   return self.Customer_Id + " " + self.Flight_Id
    
    
