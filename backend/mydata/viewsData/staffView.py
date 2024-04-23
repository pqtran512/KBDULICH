from rest_framework import generics
from mydata.models import Staff, Manager
from mydata.serializers.staffManagerSerializer import StaffSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
import pandas as pd

class StaffDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Staff instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} Staff deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class StaffAddAllAPIView(generics.CreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

    def post(self, request, *args, **kwargs):
        file_Staff = 'mydata/sqlScript/Staff.xlsx'
        data = pd.read_excel(file_Staff)

        for _, row in data.iterrows():
            random_manager = Manager.objects.order_by('?').first()
            staff_data = {
                'staff_ID': row['staff_ID'],
                'email': row['email'], 
                'phone_no': row['phone_no'], 
                'dateOfBirth': row['dateOfBirth'], 
                'isActive': row['isActive'], 
                'gender': row['gender'], 
                'lastName': row['lastName'], 
                'firstName': row['firstName'], 
                'encryp_pass': row['encryp_pass'], 
                'managerID': random_manager.pk
            }
            serializer = self.get_serializer(data=staff_data)
            if serializer.is_valid():
                serializer.save()
                print("saved")
            else:
                print(serializer.errors)
                # Handle invalid serializer data here
                pass

        return Response({'message': 'Staffs created successfully'}, status=status.HTTP_201_CREATED)