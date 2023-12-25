from django.urls import path

from .views import views
from .views.views import MyTokenObtainPairView
from .views import (countries_views, administrators_views, companies_views, customers_views,
flights_views, tickets_views, user_roles_views, user_views)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.Index),
    # create basic database
    path ('createdb/', views.create_database, name = "createdb"),
    #register
    path('adduser/', user_views.add_user, name ="adduser"),
    path('addrole/', user_roles_views.add_role, name = "addrole"),
    path('addcountry/', countries_views.add_country, name = "addcountry"),
    # Login
    path('tests', companies_views.tests, name="tests"),
    #-------Get-------
    path('customertickets/<id>', tickets_views.view_all_customer_tickets, name = "customertickets"),
    path('alltickets/', tickets_views.view_all_tickets, name = "alltickets"),
    path('ticketid/', tickets_views.ticket_by_flight_and_customer_id, name = 'ticketid') ,
    
    
    path('viewalladmins/', administrators_views.view_all_admins, name = "viewalladmins"),
    path('viewallarlines/', companies_views.view_all_airlines, name = "viewallarlines"),

    path('allcountries/', countries_views.view_all_countries, name = "allcountries"),
    path('onecountry/<id>', countries_views.view_one_country, name = "onecountry"),
    
    path('allcustomers/', customers_views.view_all_customers, name = "allcustomers"),
    path('onecustomer/<id>', customers_views.view_one_customer, name = "onecustomer"),
    
    # path('flightbydate', flights_views.view_flight_by_date, name = "flightbydate"),
    path('flightbycustomer/<id>', flights_views.view_customer_flights, name = 'customerflights'),
    path('flightbycompany/<id>', flights_views.view_company_flights, name = 'companyflights'),
    path('allflights/', flights_views.view_all_flights, name = "allflights"),
    path('flightbydestination/', flights_views.view_flight_by_destination, name = "flightbydestination"),
    path('flightbydesorig/', flights_views.view_flight_by_dest_orig, name = "flightbydesorig"),
    path('flightbyorigin/', flights_views.view_flight_by_origin, name = "flightbyorigin"),

    #-------Post-------
    path('addrole',user_roles_views.add_role, name = 'addrole' ),
    
    path('bookticket/', tickets_views.book_ticket, name = "bookticket"),    

    path('assignadministrator/', administrators_views.assign_administrator, name = 'assignadministrator'),

    path('assigncustomer/', customers_views.assign_customer, name = 'assigncustomer'),

    path('assignrole/', user_views.assign_role, name = "assignrole"),
    
    path('assignflight/', flights_views.assign_flight, name = "assignflight"),

    path('assigncompanydetails/', companies_views.assign_company_details,name ="assigncompanydetails"),
    
    #-------Put-------
    path('updateadmin', administrators_views.update_administrator_details, name = "updateadmin"),
    path('updatecompany', companies_views.update_company_details, name = "updatecompany"),
    path('updatecountry', countries_views.update_country_name, name = "updatecountry"),
    path('updatecostumer', customers_views.update_customer_details, name = "updatecostumer"),
    path('updateticket', tickets_views.update_ticket_details, name = "updateticket"),

    
    # ------- DELETE -------
    #Role
    path('deleterole/<id>', user_roles_views.delete_role, name = "deleterole"),

    #Country
    path('deletecountry/<id>', countries_views.delete_country, name = "deletecountry"),

    #User
    path('deleteuser/<id>', user_views.delete_user, name = "deleteuser"),

    #Flight
    path('deleteflight/<id>', flights_views.delete_flight, name = "deleteflight"),

    #ticket
    path('deleteticket/<id>', tickets_views.delete_ticket, name = "deleteticket"),
    path('deleteticketbycustomerandflightid/', tickets_views.delete_ticker_by_user_and_flight, name = "deleteticketbyuserandflightid"),

    path('logout/', user_views.logout, name = 'logout'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('printdata/', flights_views.print_data, name='print_data')
]
