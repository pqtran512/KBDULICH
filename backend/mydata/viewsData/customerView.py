from rest_framework import generics
from mydata.models import Customer
from mydata.serializers.customerSerializer import CustomerSerializer, CustomerLoginSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views

import logging

# Configure logging
logging.basicConfig(filename='app.log', level=logging.DEBUG)

class CustomerDetail(views.APIView):
    serializer_class = CustomerLoginSerializer

    def post(self, request, *args, **kwargs):
        username = self.request.data.get('email', None)
        password = self.request.data.get('password', None)

        try:
            if '@' in username:
                customer = Customer.objects.get(email=username)
            else: 
                customer = Customer.objects.get(username=username)

            if password != customer.password:
                return Response({'err': 1, 'msg': 'Mật khẩu chưa chính xác !', 'token': None})
            
            serializer = self.serializer_class(customer)
            return Response({'err': 0, 'msg': 'Đăng nhập thành công !', 'token': serializer.data}, status=status.HTTP_200_OK)
        
        except Customer.DoesNotExist:
            return Response({'err': 1, 'msg': 'Không tìm thấy người dùng !', 'token': None})
    
class CustomerCreate(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    msg = ''

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        msg = 'error'

        if serializer.is_valid():
            username = self.request.data.get('username')
            phone_no = self.request.data.get('phone_no')
            email = self.request.data.get('email')

            new_customer = Customer.objects.create(
                    username = username,
                    password = request.data['password'],
                    phone_no = phone_no,
                    email    = email
                )

            serializer = self.get_serializer(new_customer)
            response_data = {'err': 0, 'msg': 'success', 'token': serializer.data}
            return Response(response_data, status=status.HTTP_201_CREATED)
                
            
        else:
            errors = serializer.errors
            tmp = []
            if 'username' in errors:
                tmp.append('Tên người dùng đã tồn tại !')
            elif 'email' in errors:
                tmp.append('Email đã được sử dụng !')
            elif 'phone_no' in errors:
                tmp.append('Số điện thoại đã được sử dụng !')
            
            msg = ' '.join(tmp)

            return Response({'error': 1, 'msg': msg, 'token': None})
