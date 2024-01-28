from django.urls import path
from mydata.viewsData.customerView import *

urlpatterns = [
    path('create-customer/', CustomerCreate.as_view(), name='create_customer'),
]