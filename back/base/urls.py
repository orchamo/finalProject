from django.urls import path
from . import views
from .views import MyTokenObtainPairView
 
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.Index),

    #register
    path('adduser/', views.addUser),
    path('addrole/', views.addRole, name = "addrole"),
    path('addcountry/', views.addCountry, name = "addcountry"),
    # Login
    path('assignrole', views.assignRole, name = "assignrole"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
