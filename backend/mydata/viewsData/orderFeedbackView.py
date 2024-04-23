import random
from rest_framework import generics
from mydata.models import Order, Feedback, Tour, Customer
from mydata.serializers.orderFeedbackSerializer import OrderAddSerializer, FeedbackSerializer, OrderOfTourSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
import pandas as pd

class OrderAddViewAPI(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAddSerializer

    def post(self, request, *args, **kwargs):
        name = self.request.data.get('username')
        email = self.request.data.get('email')
        phone = self.request.data.get('phone')
        note = self.request.data.get('note')
        # thiếu ticket_num và tour_ID
        # thiếu payment_method

        i = Order.objects.count()
        while Order.objects.filter(order_ID=f"O_{i:03}").exists():
            i += 1

        new_order = {
            'order_ID': f"O_{i:03}",
            'name': name,
            'email': email,
            'phone': phone,
            'note': note
        }

class OrderAddAllViewAPI(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAddSerializer

    def post(self, request, *args, **kwargs):
        file_order = 'mydata/sqlScript/Order.xlsx'
        data = pd.read_excel(file_order)

        for _, row in data.iterrows():
            userID = Customer.objects.get(customer_ID=row['user_ID'])
            tourID = Tour.objects.filter(tour_ID__contains=row['tour_ID'])
            tourID = random.choice(tourID)

            order_data = {
                'order_ID': row['order_ID'],
                'pay_method': row['pay_method'],
                'user_ID': userID.pk,
                'email': row['email'],
                'name': row['name'],
                'phone_no': row['phone_no'],
                'date_time': row['date_time'],
                'note': row['note'],
                'ticket_num': row['ticket_num'],
                'tour_ID': tourID.pk
            }
            serializer = self.get_serializer(data=order_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_200_OK)

        return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)
    
class OrderDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAddSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Staff instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} Order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class OrderOfTourAPIView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderOfTourSerializer

    def post(self, request, *args, **kwargs):
        tourID = self.request.data.get('tour_ID')
        order = Order.objects.filter(tour_ID=tourID)

        if order.exists():  
            orderlst = self.serializer_class(order, many=True)
            return Response(orderlst.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No orders found for the specified tour ID"}, status=status.HTTP_200_OK)
        
class FeedbackDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Staff instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} Order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class FeedbackAddAllAPIView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def post(self, request, *arg, **kwargs):
        file_feedback = 'mydata/sqlScript/Feedback.xlsx'
        data = pd.read_excel(file_feedback)

        for _, row in data.iterrows():
            userID = Customer.objects.get(customer_ID=row['user_ID'])
            order = Order.objects.get(user_ID=row['user_ID'])
            tourID = order.tour_ID.pk.split('_')[0]
            print(tourID)
            
            feedback_data = {
                'feedback_ID': row['feedback_ID'],
                'ratings': row['ratings'],
                'reviews': row['reviews'],
                'datetime': row['datetime'],
                'user_ID': userID.pk,
                'tour_ID': tourID
            }

            serializer = self.get_serializer(data=feedback_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({serializer.errors}, status=status.HTTP_200_OK)

        return Response({'message': 'Feedback created successfully'}, status=status.HTTP_201_CREATED)
    
class FeedbackTourAPIView(views.APIView):
    def post(self, request, *arg, **kwargs):
        tour_id = self.request.data.get('tour_ID')
        tour = tour_id.split('_')[0]

        feedback = Feedback.objects.filter(tour_ID=tour)
        serializer = FeedbackSerializer(feedback, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)