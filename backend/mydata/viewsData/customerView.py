from rest_framework import generics
from mydata.models import Customer
from mydata.serializers.customerSerializer import CustomerSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status

class CustomerDetail(generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def getCustomer(self):
        username = self.request.query_params.get('username', None)
        password = self.request.query_params.get('password', None)
        
        if username is None or password is None:
            raise NotFound("Username and password are required.")

        try:
            return Customer.objects.get(username=username, password=password)
        except Customer.DoesNotExist:
            raise NotFound("Customer not found.")

    def get(self, request, *args, **kwargs):
        instance = self.getCustomer()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CustomerCreate(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.createCustomer(serializer.validated_data)
