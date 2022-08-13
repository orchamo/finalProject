from django.urls import path
from . import views
from .views import MyTokenObtainPairView
 
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.Index),

    #register
    path('adduser/', views.add_user),
    path('addrole/', views.add_role, name = "addrole"),
    path('addcountry/', views.add_country, name = "addcountry"),
    # Login
    path('assigncompany/', views.assign_company_details, name = 'assigncompanydetails'),
    path('assignadministrator/', views.assign_administrator, name = 'assignadministrator'),
    path('assigncustomer/', views.assign_customer, name = 'assigncustomer'),
    path('assignrole/', views.assign_role, name = "assignrole"),
    path('assignflight/', views.assign_flight, name = "assignflight"),
    path('allcountries/', views.view_all_countries, name = "allcountries"),
    path('allflights/', views.view_all_flights, name = "allflights"),
    path('assigncompanydetails/', views.assign_company_details,name ="assigncompanydetails"),
    
    #Delete
    path('deleterole/', views.delete_role, name = "deleterole"),
    path('deletecountry/', views.delete_country, name = "deletecountry"),
    path('deleteuser/', views.delete_user, name = "deleteuser"),
    path('deleteflight/', views.delete_flight, name = "deleteflight"),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
