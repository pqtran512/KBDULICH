from rest_framework import generics
from mydata.models import Manager
from mydata.serializers.staffManagerSerializer import ManagerSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
import pandas as pd

class ManagerDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Manager instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} Manager deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class ManagerAddAllAPIView(generics.CreateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

    def post(self, request, *args, **kwargs):
        file_manager = 'mydata/sqlScript/manager.xlsx'
        data = pd.read_excel(file_manager)

        for _, row in data.iterrows():
            manager_data = {
                'manager_ID': row['manager_ID'], 
                'email': row['email'], 
                'password': row['password']
            }
            serializer = self.get_serializer(data=manager_data)
            print (serializer)
            if serializer.is_valid():
                serializer.save()
                print("saved")
            else:
                # Handle invalid serializer data here
                pass

        return Response({'message': 'Managers created successfully'}, status=status.HTTP_201_CREATED)