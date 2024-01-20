from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from mydata.models import Manager, Staff, Place, PlaceImages, Tour, TourSchedule, TourService, Order, Request, Feedback, AddRequest, EditRequest, CancelRequest, Staff_add_Order_of_Tour, Customer, Customer_views_Place
from mydata.serializer import ManagerSerializer, StaffSerializer, Staff_add_Order_of_TourSerializer, PlaceSerializer, PlaceImagesSerializer, TourSerializer, TourScheduleSerializer, TourServiceSerializer, OrderSerializer
from mydata.serializer import RequestSerializer, FeedbackSerializer, AddRequestSerializer, EditRequestSerializer, CustomerSerializer, Customer_views_PlaceSerializer

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})


