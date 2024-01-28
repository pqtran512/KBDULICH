from rest_framework import serializers
from mydata.models import Place, PlaceImages, Tour, TourSchedule, TourService

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Place
        fields=('place_ID', 'province', 'description', 'name')

class PlaceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=PlaceImages
        fields=('images', 'place_ID')

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




