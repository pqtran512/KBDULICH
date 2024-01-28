from django.urls import path
from mydata.views import CustomerCreate
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('create-customer/', CustomerCreate.as_view(), name='create_customer'),
]