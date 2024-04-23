from rest_framework import serializers
from mydata.models import Order, Feedback

class OrderAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'

class OrderOfTourSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields='__all__'