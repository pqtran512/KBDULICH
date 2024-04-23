from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from mydata.viewsData.customerView import *
from mydata.viewsData.tourPlaceView import *
from mydata.viewsData.managerView import *
from mydata.viewsData.staffView import *
from mydata.viewsData.orderFeedbackView import *
from mydata.models import Customer, Staff, Manager, User
from mydata.serializers.staffManagerSerializer import ManagerTokenSerializer, StaffTokenSerializer
# from mydata.serializers.customerSerializer import CustomerTokenSerializer
# from django.contrib.auth.models import Permission
# import jwt

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         info = None
#         if user.is_staff == 1:
#             info = Staff.objects.get(email=user.username)
#             tmp = StaffTokenSerializer(info)
#             info = tmp.data
#         elif user.is_superuser == 1:
#             info = Manager.objects.get(email=user.username)
#             tmp = ManagerTokenSerializer(info)
#             info = tmp.data
#         else:
#             info = Customer.objects.get(email=user.username)
#             tmp = CustomerTokenSerializer(info)
#             info = tmp.data
#         token['info'] = info
#         # token['id'] = None
#         # token['refresh'] = str(token['refresh'])
#         return token
    
#     def validate(self, attrs):
#         data = attrs
#         try:
#             user = User.objects.get(email=data['username'])
#         except User.DoesNotExist:
#             raise serializers.ValidationError({'error': "User with this email does not exist.", 'token': None})

#         return attrs
    
# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)

#         if serializer.is_valid():
#             # print(serializer)
#             data = serializer.validated_data
#             user = User.objects.get(username=data['username'])
#             # print(user)
#             token = serializer.get_token(user)

#             # print(user.get_all_permissions())
#             permissions = Permission.objects.all()
#             for permission in permissions:
#                 print(permission.codename)

#             if token:
#                 return Response({'error': 0, 'token': str(token)}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 1, 'token': None}, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_200_OK)

# @api_view(['GET'])
# def get_info(request):
#     data = request.GET.get('data')  # Assuming the token data is passed as a parameter named 'data'
#     if data:
#         decoded_data = jwt.decode(data, options={"verify_signature": False})
#         return Response(decoded_data['info'], status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Token data not provided'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})