from rest_framework import generics
from mydata.models import Customer
from mydata.serializers.customerSerializer import CustomerSerializer, CustomerLoginSerializer, CustomerRegisterSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
# from django.db.models import Count
from rest_framework import permissions
import pandas as pd

from django.contrib.auth.models import User
from mydata.models import Customer
from rest_framework.authtoken.models import Token

class CustomerDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Customer instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} customers deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class CustomerAddAllAPIView(generics.CreateAPIView):
    # queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def post(self, request, *args, **kwargs):
        file_customer = 'mydata/sqlScript/Customer.xlsx'
        data = pd.read_excel(file_customer)

        for _, row in data.iterrows():
            customer_data = {
                'customer_ID': row['user_ID'],
                'username': row['username'],
                'password': row['password'],
                'phone_no': row['phone_no'],
                'email': row['email']
            }
            print(customer_data)
            serializer = self.get_serializer(data=customer_data)
            print (serializer)
            if serializer.is_valid():
                customer = serializer.save()
                # token, created = Token.objects.get_or_create(user=customer.user)
                print(f"Token for {customer.customer_ID}")
            else:
                # Handle invalid serializer data here
                print(serializer.errors)

        return Response({'message': 'Customers created successfully'}, status=status.HTTP_201_CREATED)

class CustomerLoginAPIView(views.APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CustomerLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = self.request.data.get('username')
        password = self.request.data.get('password')

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
        
    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         # Allow POST requests without authentication
    #         return []
    #     else:
    #         # Use the default permission classes for other methods
    #         return super().get_permissions()
    
class CustomerCreate(generics.CreateAPIView):
    # queryset = Customer.objects.all()
    serializer_class = CustomerRegisterSerializer
    msg = ''

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        msg = 'error'

        if serializer.is_valid():
            username = self.request.data.get('username')
            phone_no = self.request.data.get('phone_no')
            email = self.request.data.get('email')

            i = 1
            while Customer.objects.filter(customer_ID=f"U_{i}").exists():
                i += 1

            customer_id = f"U_{i}"

            new_customer = Customer.objects.create(
                    customer_ID = customer_id,
                    username = username,
                    password = request.data['password'],
                    phone_no = phone_no,
                    email    = email
            )

            if not new_customer.user:
                new_customer.user = new_customer.create_user()

            token, created = Token.objects.get_or_create(user=new_customer.user)
            print(f"Token for {new_customer.customer_ID}: {token}")
            # print(customer_id)

            serializer = self.get_serializer(new_customer)
            response_data = {'err': 0, 'msg': 'success', 'token': serializer.data}
            return Response(response_data, status=status.HTTP_201_CREATED)
                
            
        else:
            errors = serializer.errors
            print(errors)
            error = 0
            # tmp = []
            if 'username' in errors:
                error = error + 1
                # tmp.append('Tên người dùng đã tồn tại !')
                return Response({'error': error, 'msg': 'Tên người dùng đã tồn tại !', 'token': None}, status=status.HTTP_200_OK)
            if 'email' in errors:
                error = error + 1
                # tmp.append('Email đã được sử dụng !')
                return Response({'error': error, 'msg': 'Email đã được sử dụng !', 'token': None}, status=status.HTTP_200_OK)
            if 'phone_no' in errors:
                error = error + 1
                # tmp.append('Số điện thoại đã được sử dụng !')
                return Response({'error': error, 'msg': 'Số điện thoại đã được sử dụng !', 'token': None}, status=status.HTTP_200_OK)

        # username = self.request.data.get('username')
        # password = self.request.data.get('password')
        # phone_no = self.request.data.get('phone_no')
        # email = self.request.data.get('email')

        # i = 1
        # while Customer.objects.filter(customer_ID=f"U_{i}").exists():
        #     i += 1
        # customer_id = f"U_{i}"

        # new_customer_data = {
        #     'customer_ID': customer_id,
        #     'username': username,
        #     'password': password,
        #     'phone_no': phone_no,
        #     'email': email
        # }
        # print(new_customer_data)

        # serializer = self.get_serializer(data=new_customer_data)
        # if serializer.is_valid():
        #     new_customer = serializer.save()
        #     response_data = {'err': 0, 'msg': 'success', 'token': serializer.data}
        #     return Response(response_data, status=status.HTTP_201_CREATED)
        # else:
        #     # Handle serializer validation errors
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        