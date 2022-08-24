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

    #register
    path('adduser/', user_views.add_user),
    path('addrole/', user_roles_views.add_role, name = "addrole"),
    path('addcountry/', countries_views.add_country, name = "addcountry"),
    # Login
    path('assignadministrator/', administrators_views.assign_administrator, name = 'assignadministrator'),
    path('assigncustomer/', customers_views.assign_customer, name = 'assigncustomer'),
    path('assignrole/', user_views.assign_role, name = "assignrole"),
    path('assignflight/', flights_views.assign_flight, name = "assignflight"),
    path('allcountries/', countries_views.view_all_countries, name = "allcountries"),
    path('allflights/', flights_views.view_all_flights, name = "allflights"),
    path('assigncompanydetails/', companies_views.assign_company_details,name ="assigncompanydetails"),
    
    #Delete
    path('deleterole/', user_roles_views.delete_role, name = "deleterole"),
    path('deletecountry/', countries_views.delete_country, name = "deletecountry"),
    path('deleteuser/', user_views.delete_user, name = "deleteuser"),
    path('deleteflight/', flights_views.delete_flight, name = "deleteflight"),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
