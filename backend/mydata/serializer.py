from rest_framework import serializers
from mydata.models import Manager, Staff, Place, PlaceImages, Tour, TourSchedule, TourService, Order, Request, Feedback
from mydata.models import AddRequest, EditRequest, CancelRequest, Staff_add_Order_of_Tour, Customer, Customer_views_Place

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Manager
        fields=('manager_ID', 'email', 'password')

class StaffSerializer(serializers.ModelSerializer):
    staff_ID = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_no = serializers.CharField(required=True)
    dateOfBirth = serializers.DateField()
    isActive = serializers.BooleanField()
    gender = serializers.CharField(max_length=1)
    lastName = serializers.CharField(required=True)
    firstName = serializers.CharField(required=True)
    encryp_pass = serializers.CharField(required=True)
    managerID = serializers.PrimaryKeyRelatedField(queryset=Manager.objects.all(), allow_null=False, required=True)

    def createStaff(self, staff_data):
        return Staff.objects.create(**staff_data)
    
    def editStaff(self, instance, new_data):
        instance.staff_ID = new_data.get('staff_ID', instance.staff_ID)
        instance.email = new_data.get('email', instance.email)
        instance.phone_no = new_data.get('phone_no', instance.phone_no)
        instance.dateOfBirth = new_data.get('dateOfBirth', instance.dateOfBirth)
        instance.isActive = new_data.get('isActive', instance.isActive)
        instance.gender = new_data.get('gender', instance.gender)
        instance.lastName = new_data.get('lastName', instance.lastName)
        instance.firstName = new_data.get('firstName', instance.firstName)
        instance.encryp_pass = new_data.get('encryp_pass', instance.encryp_pass)
        instance.managerID = new_data.get('managerID', instance.managerID)

        instance.save()
        return instance
    
    class Meta:
        model=Staff
        fields=('staff_ID', 'email', 'phone_no', 'dateOfBirth', 'isActive', 'gender', 'lastName', 'firstName', 'encryp_pass', 'managerID')

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Place
        fields=('place_ID', 'province', 'description', 'name')

class PlaceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=PlaceImages
        fields=('images', 'place_ID')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=('customer_ID', 'username', 'password', 'phone_no', 'email')

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tour
        fields=('tour_ID', 'departure', 'vehicle', 'seat_num', 'price', 'isActive', 'starting_date', 'bookingDeadline', 'day_num', 'night_num', 'note', 'places')

class TourScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model=TourSchedule
        fields=('tour_ID', 'TSchedule')

class TourServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=TourService
        fields=('tour_ID', 'TService')

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

class Staff_add_Order_of_TourSerializer(serializers.ModelSerializer):
    class Meta:
        model=Staff_add_Order_of_Tour
        fields=('staff_ID', 'order_ID')

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=Request
        fields=('request_ID', 'status', 'date', 'reply', 'typ', 'tour_ID', 'staff_ID', 'manager_ID')

class EditRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=EditRequest
        fields=('tour_draft', 'request_ID')

class AddRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=AddRequest
        fields=('request_ID', 'departure', 'vehicle', 'seat_num', 'price', 'isActive', 'starting_date', 'bookingDeadline', 'day_num', 'night_num', 'note', 'places')



