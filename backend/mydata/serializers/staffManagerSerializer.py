from rest_framework import serializers
from mydata.models import Manager, Staff, Request
from mydata.models import AddRequest, EditRequest, CancelRequest

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Manager
        fields=('manager_ID', 'email', 'password')

class ManagerTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=Manager
        fields=('manager_ID', 'email')

class StaffTokenSerializer(serializers.ModelSerializer):    
    class Meta:
        model=Staff
        fields=('staff_ID', 'email', 'phone_no', 'dateOfBirth', 'isActive', 'gender', 'lastName', 'firstName')
        # extra_kwargs = {'encryp_pass': {'write_only': True}}

class StaffSerializer(serializers.ModelSerializer):    
    class Meta:
        model=Staff
        fields=('staff_ID', 'email', 'phone_no', 'dateOfBirth', 'isActive', 'gender', 'lastName', 'firstName', 'encryp_pass', 'managerID')
        extra_kwargs = {'encryp_pass': {'write_only': True}}

    def createStaff(self, staff_data):
        tmp = staff_data['firstName'].strip() + "." + staff_data['lastName'].strip()
        number = Staff.objects.filter(email__icontains = tmp).count()

        new_staff = Staff(
            email       = tmp + str(number),
            phone_no    = staff_data['phone_no'],
            dateOfBirth = staff_data['dateOfBrith'],
            isActive    = True,
            gender      = staff_data['gender'],
            lastName    = staff_data['lastName'],
            firstName   = staff_data['firstName'],
            encryp_pass = staff_data['phone_no'],
            managerID   = staff_data['managerID'],
        )

        new_staff.save()
        return new_staff
    
    def updateStaff(self, instance, new_data):
        instance.phone_no = new_data.get('phone_no', instance.phone_no)
        instance.dateOfBirth = new_data.get('dateOfBirth', instance.dateOfBirth)
        instance.isActive = new_data.get('isActive', instance.isActive)
        instance.gender = new_data.get('gender', instance.gender)
        instance.encryp_pass = new_data.get('encryp_pass', instance.encryp_pass)

        instance.save()
        return instance

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