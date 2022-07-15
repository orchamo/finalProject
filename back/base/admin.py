from django.contrib import admin
from base.models import Countries, User_Roles,Users,Airline_Companies,Administrators,Customers,Flights,Tickets

# Register your models here.
admin.site.register(User_Roles)
admin.site.register(Countries)
admin.site.register(Users)
admin.site.register(Airline_Companies)
admin.site.register(Administrators)
admin.site.register(Customers)
admin.site.register(Flights)
admin.site.register(Tickets)

