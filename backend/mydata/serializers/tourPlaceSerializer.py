from rest_framework import serializers
from django.db.models import Avg
from mydata.models import Place, PlaceImages, Tour, Feedback, Order
from mydata.serializers.staffManagerSerializer import StaffTokenSerializer
from mydata.serializers.orderFeedbackSerializer import FeedbackSerializer
import json

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Place
        fields = '__all__'
        # fields=('place_ID', 'province', 'description', 'name')

class PlaceImagesAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=PlaceImages
        fields = '__all__'

class PlaceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImages
        fields = ('images',)

class PlaceAndImageSerializer(serializers.ModelSerializer):
    images = PlaceImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = ('place_ID', 'province', 'images')

class PlaceTourSerializer(serializers.ModelSerializer):
    places = PlaceAndImageSerializer(many=True, read_only=True)
    staff = StaffTokenSerializer(many=False, read_only=True)
    rating = serializers.SerializerMethodField()
    cus_num = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = ('tour_ID', 'name', 'departure', 'vehicle', 'seat_num', 'price', 'isActive', 'starting_date', 'bookingDeadline', 'day_num', 'night_num', 'note', 'places', 'schedule', 'service', 'staff', 'rating', 'cus_num')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['schedule'] = json.loads(instance.schedule.replace('\\"', '"'))
        representation['service'] = json.loads(instance.service.replace('\\"', '"')) 
        # feedback = Feedback.objects.filter(tour_ID=instance.tour_ID)
        # rating = feedback.aggregate(value=Avg('ratings'))['value']
        # representation['rating'] = rating
        # representation['cus_num'] = True
        return representation
    
    def get_rating(self, instance):
        tour_id = instance.tour_ID.split("_")[0]
        feedback = Feedback.objects.filter(tour_ID=tour_id)
        rating = 0
        for i in feedback:
            rating+=i.ratings
        if feedback.count() == 0:
            return 0
        rating = rating / feedback.count()
        return rating

    def get_cus_num(self, instance):
        # Assuming you want to count the number of customers from feedback
        orders = Order.objects.filter(tour_ID=instance.tour_ID)
        num = 0
        for order in orders:
            num+=order.ticket_num
        return num

class PlaceTourFeedbackSerializer(serializers.ModelSerializer):
    places = PlaceAndImageSerializer(many=True, read_only=True)
    staff_ID = StaffTokenSerializer(many=False, read_only=True)

    class Meta:
        model = Tour
        fields = ('tour_ID', 'name', 'departure', 'vehicle', 'seat_num', 'price', 'isActive', 'starting_date', 'bookingDeadline', 'day_num', 'night_num', 'note', 'places', 'schedule', 'service', 'staff_ID')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['schedule'] = json.loads(instance.schedule.replace('\\"', '"'))
        representation['service'] = json.loads(instance.service.replace('\\"', '"'))
        return representation

class TourViewSerializer(serializers.ModelSerializer):
    places = PlaceAndImageSerializer(many=True, read_only=True)
    staff = StaffTokenSerializer(many=False, read_only=True)

    class Meta:
        model=Tour
        fields = ('tour_ID', 'name', 'departure', 'vehicle', 'seat_num', 'price', 'isActive', 'starting_date', 'bookingDeadline', 'day_num', 'night_num', 'note', 'places', 'schedule', 'service', 'staff')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['schedule'] = json.loads(instance.schedule.replace('\\"', '"'))
        representation['service'] = json.loads(instance.service.replace('\\"', '"'))
        return representation

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tour
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['schedule'] = json.loads(instance.schedule.replace('\\"', '"'))
        representation['service'] = json.loads(instance.service.replace('\\"', '"'))
        return representation

class TourUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('tour_ID', 'name', 'departure', 'vehicle', 'seat_num', 'price', 'isActive', 'starting_date', 'bookingDeadline', 'day_num', 'night_num', 'note', 'schedule', 'service')