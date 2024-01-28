from rest_framework import serializers
from mydata.models import Order, Feedback
from mydata.models import Customer, Customer_views_Place

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=('customer_ID', 'username', 'password', 'phone_no', 'email')

    def createCustomer(self, customer_data):
        username = customer_data['username']
        phone_no = customer_data['phone_no']
        email    = customer_data['email']
        if Customer.objects.filter(username=username).exists():
            raise serializers.ValidationError("A customer with this username already exists.")
        if Customer.objects.filter(email=email).exists():
            raise serializers.ValidationError("A customer with this email already exists.")
        if Customer.objects.filter(phone_no=phone_no).exists():
            raise serializers.ValidationError("A customer with this phone_no already exists.")

        new_customer = Customer(
            username    = username,
            password    = customer_data['password'],
            phone_no    = phone_no,
            email       = email
        )

        new_customer.save()
        return new_customer
    
    def updateCustomer(self, instance, new_data):
        instance.password = new_data.get('password', instance.password)
        instance.phone_no = new_data.get('phone_no', instance.phone_no)
        instance.email = new_data.get('email', instance.email)

        instance.save()
        return instance

class Customer_views_PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer_views_Place
        fields=('place_ID', 'user_ID')

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields=('feedback_ID', 'ratings', 'reviews', 'datetime', 'user_ID', 'tour_ID')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=('order_ID', 'pay_method', 'user_ID', 'email', 'name', 'phone_no', 'date_time', 'note', 'ticket_num', 'tour_ID', 'staff_ID')

