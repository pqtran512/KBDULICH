from datetime import datetime
import json
from django.db.models import Q, Avg
from rest_framework import generics
from mydata.models import Staff, Tour, Feedback
from mydata.models import Place
from mydata.serializers.tourPlaceSerializer import *
from mydata.serializers.orderFeedbackSerializer import *
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
from django.db.models import Count, F, Case, When, IntegerField, Value
from rest_framework.permissions import AllowAny
import pandas as pd

class PlaceDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Manager instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} Places deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
class TourDeleteAllAPIView(generics.DestroyAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer

    def delete(self, request, *args, **kwargs):
        # Delete all Manager instances
        deleted_count, _ = self.get_queryset().delete()
        return Response({'message': f'{deleted_count} Tour deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class PlaceAddAllAPIView(generics.CreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

    def post(self, request, *args, **kwargs):
        file_place = 'mydata/sqlScript/Places.xlsx'
        data = pd.read_excel(file_place)

        try:
            for _, row in data.iterrows():
                place_data = {
                    'place_ID': row['place_ID'],
                    'province': row['province'],
                    'description': row['description'],
                    'name': row['name']
                }
                print(place_data)
                serializer = self.get_serializer(data=place_data)
                serializer.is_valid(raise_exception=True)  # Validate data, raise exception if invalid
                serializer.save()
            return Response({'message': 'Places created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': f'Error creating places: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PlaceImagesAddAllAPIView(generics.CreateAPIView):
    queryset = PlaceImages.objects.all()
    serializer_class = PlaceImagesAddSerializer

    def post(self, request, *args, **kwargs):
        file_path = 'mydata/sqlScript/PlaceImages.xlsx'
        data = pd.read_excel(file_path)

        for _, row in data.iterrows():
            place_ID = Place.objects.get(place_ID=row['place_ID'])
            image = {
                'images': row['images'],
                'place_ID': place_ID.pk
            }

            serializer = self.get_serializer(data=image)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_200_OK)
        
        return Response({"Place Images add successfully"}, status=status.HTTP_201_CREATED)

class PlaceSearchByName(generics.ListAPIView):
    place_set = Place.objects.all()
    place_serializer = PlaceSerializer

    def post(self, request, *args, **kwargs):
        name = self.request.data.get('name', None)

        places = Place.objects.filter(name__icontains=name)

        if places.exists():
            serializer = self.get_serializer(places, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Place not found."}, status=status.HTTP_404_NOT_FOUND)

class ToursGetAllConditionAPIView(generics.ListAPIView):
    queryset = Tour.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PlaceTourSerializer

    def post(self, request, *args, **kwargs):        
        condition = {'day_num': None, 'departure': None, 'isActive': None,
                     'starting_date': None, 'destination': None, 'price': None, 'seat_num': None,
                     'vehicle': None, 'ticket_num': None}
        
        # page = None if self.request.data.get('page') == "null" else int(self.request.data.get('page'))
        # limit = int(self.request.data.get('limit'))
        condition['day_num'] = None if self.request.data.get('day_num') in ["", None] else self.request.data.get('day_num')
        condition['departure'] = None if self.request.data.get('departure') in ["", None] else self.request.data.get('departure')
        condition['starting_date'] = None if self.request.data.get('starting_date') in ["", None] else datetime.strptime(self.request.data.get('starting_date'), "%Y_%m_%d").date()
        condition['destination'] = None if self.request.data.get('destination') in ["", None] else self.request.data.get('destination')
        condition['price'] = None if self.request.data.get('price') in ["", None] else self.request.data.get('price')
        condition['seat_num'] = None if self.request.data.get('seat_num') in ["", None] else self.request.data.get('seat_num')
        condition['vehicle'] = None if self.request.data.get('vehicle') in ["", None] else self.request.data.get('vehicle')
        condition['isActive'] = None if self.request.data.get('isActive') in ["", None] else int(self.request.data.get('isActive'))
        condition['ticket_num'] = None if self.request.data.get('ticket_num') in ["", None] else self.request.data.get('ticket_num')

        tour_set = Tour.objects.all()
        if condition['ticket_num'] != None:
            tour_set = Tour.objects.annotate(
                ticket_num=Case(
                    When(seat_num__isnull=False, then=F('seat_num') - Count('order')),
                    default=Value(None),
                    output_field=IntegerField()
                )
            )
            # print(tour_queryset[0].ticket_num)

        cond = []
        for key, value in condition.items():
            if value != None:
                if key in ['price', 'day_num', 'seat_num', 'ticket_num']:
                    if value[0] == 'E':
                        cond.append(Q(**{key: int(value[1:])}))
                    elif value[0] == 'A':
                        cond.append(Q(**{key + '__gte': int(value[1:])}))
                    elif value[0] == 'U':
                        cond.append(Q(**{key + '__lte': int(value[1:])}))
                    else:
                        i1 = value.index('T')
                        i2 = i1 + 1
                        cond.append(Q(**{key + '__gte': int(value[1:i1])}))
                        cond.append(Q(**{key + '__lte': int(value[i2:])}))
                elif type(value) is not str and key != 'isActive':
                    cond.append(Q(**{key + '__gte': value}))
                elif key == 'destination':
                    cond.append(Q(**{'places__province__icontains': value}))
                else:
                    cond.append(Q(**{key: value}))

        # print(cond)

        tour_queryset = tour_set.filter(*cond).order_by('starting_date')
        # print(tour_queryset)
        number = tour_queryset.count()
        tour_list = self.serializer_class(tour_queryset, many=True)
        
        result = {'count': number, 'row': tour_list.data}
        return Response(result, status=status.HTTP_200_OK)
    
    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         # Allow POST requests without authentication
    #         return [AllowAny]
    #     else:
    #         # Use the default permission classes for other methods
    #         return super().get_permissions()

class TourGetByNameAPIView(generics.ListAPIView):
    # queryset = Tour.objects.all()
    serializer_class = PlaceTourSerializer

    def post(self, request, *args, **kwargs):
        name = self.request.data.get('name')
        tour = Tour.objects.filter(name__icontains=name)
        tour_list = self.serializer_class(tour, many=True)
        result = {'count': tour.count(), 'row': tour_list.data}
        return Response(result, status=status.HTTP_200_OK)

class TourAddAllAPIView(generics.CreateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer

    def post(self, request, *args, **kwargs):
        file_tour = 'mydata/sqlScript/Tour.xlsx'
        file_tour_place = 'mydata/sqlScript/Tour_has_Place.xlsx'
        file_tour_schedule = 'mydata/sqlScript/TourSchedule.xlsx'
        file_tour_service = 'mydata/sqlScript/TourService.xlsx'
        data_tour = pd.read_excel(file_tour)
        data_tour_place = pd.read_excel(file_tour_place)
        date_tour_schedule = pd.read_excel(file_tour_schedule)
        data_tour_service = pd.read_excel(file_tour_service)

        try:
            for _, row in data_tour.iterrows():
                tour_id = f"{row['tour_id']}_{row['starting_date']}"
                if Tour.objects.filter(tour_ID=tour_id).exists():
                    i = 1
                    while Tour.objects.filter(tour_ID=f"{tour_id}_{i}").exists():
                        i += 1
                    tour_id = f"{tour_id}_{i}"

                schedule = date_tour_schedule[date_tour_schedule['tour_id'] == row['tour_id']]
                schedule = schedule['Tschedule']
                schedule_data = schedule.to_json(force_ascii=False, orient='values')

                # schedule_data_list = json.loads(schedule_data)
                # first_item = schedule_data_list[0]
                # print(first_item)

                service = data_tour_service[data_tour_service['tour_id'] == row['tour_id']]
                service = service['Tservice']
                service_data = service.to_json(force_ascii=False, orient='values')

                place_ids = data_tour_place.loc[data_tour_place['tour_id'] == row['tour_id'], 'place_ID'].tolist()

                places = Place.objects.filter(place_ID__in=place_ids)
                random_staff = Staff.objects.order_by('?').first()

                tour_data = {
                    'tour_ID': tour_id,                        
                    'name': row['name'],
                    'departure': row['departure'],
                    'vehicle': row['vehicle'],
                    'seat_num': row['seatNum'],
                    'price': row['price'],
                    'isActive': row['isActive'],
                    'starting_date': row['starting_date'],
                    'bookingDeadline': row['booking_deadline'],
                    'day_num': row['day_num'],
                    'night_num': row['night_num'],
                    'schedule': schedule_data,
                    'service': service_data,
                    'note': "No note",
                    'staff': random_staff,
                }
                print(tour_data)
                # serializer = self.get_serializer(data=tour_data)
                # serializer.is_valid(raise_exception=True)  # Validate data, raise exception if invalid
                # serializer.save()
                tour = Tour.objects.create(**tour_data)

                # Associate places with the tour
                tour.places.add(*places)

            return Response({'message': 'Places created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': f'Error creating places: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TourSearchDeadlinesAPIView(generics.ListAPIView):
    # queryset = Tour.objects.all()
    serializer_class = TourViewSerializer

    def post(self, request, *args, **kwargs):
        tour = Tour.objects.all().filter(isActive=1).order_by('bookingDeadline')
        tour_list = self.serializer_class(tour, many=True)
        result = {'count': tour.count(), 'row': tour_list.data}

        return Response(result, status=status.HTTP_200_OK)
    
class TourHighestRatingAPIView(generics.ListAPIView):
    # queryset = Tour.objects.all()
    serializer_class = PlaceTourFeedbackSerializer

    def post(self, request, *args, **kwargs):
        list = Feedback.objects.values_list('tour_ID', flat=True).distinct()
        ratings = []
        for i in list:
            filtered_queryset = Feedback.objects.filter(tour_ID=i)
            average = filtered_queryset.aggregate(value=Avg('ratings'))['value']
            number = filtered_queryset.count()
            ratings.append({'tour_ID': i, 'average_rating': average, 'order': number})
        sorted_tour = sorted(ratings, key=lambda x: x['average_rating'], reverse=True)
        result_tour = []
        if sorted_tour is not []:
            for i in sorted_tour:
                tour = Tour.objects.filter(isActive=1, tour_ID__icontains=i['tour_ID']).order_by('bookingDeadline').first()
                if tour == None: 
                    continue
                tour_list = self.serializer_class(tour)
                # print(tour_list.data)
                result_tour.append({'row': tour_list.data, 'average_rating': i['average_rating'], 'order': i['order']})

        result = {'count': len(result_tour), 'row': result_tour}

        return Response(result, status=status.HTTP_200_OK)

class TourSearchByPlaceAPIView(generics.ListAPIView):
    # queryset = Tour.objects.all()
    serializer_class = TourViewSerializer

    def post(self, request, *args, **kwargs):
        pass

class TourSearchByStaffIDAPIView(generics.ListAPIView):
    # queryset = Tour.objects.all()
    serializer_class = TourViewSerializer

    def post(self, request, *args, **kwargs):
        staff = self.request.data.get('staff')

        tour = Tour.objects.filter(staff=staff)
        tour_lst = self.serializer_class(tour, many=True)
        return Response(tour_lst.data, status=status.HTTP_200_OK)

class TourDetailAPIView(views.APIView):
    serializer_class = TourViewSerializer

    def post(self, request, *args, **kwargs):
        tour_ID = self.request.data.get('tour_ID')
        tour = Tour.objects.get(tour_ID=tour_ID)

        try:            
            serializer = self.serializer_class(tour)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Tour.DoesNotExist:
            return Response("Không có tour", status=status.HTTP_200_OK)
    
class TourCreateAPIView(generics.CreateAPIView):
    # queryset = Tour.objects.all()
    serializer_class = TourSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        name = self.request.data.get('name')
        same_tour = Tour.objects.filter(name=name)
        starting_date = datetime.strptime(self.request.data.get('starting_date'), "%Y_%m_%d").date()
        set_id = ""
        if same_tour.count() == 0:
            i = Tour.objects.count()
            while Tour.objects.filter(tour_ID=f"T_{i:03}_{starting_date}").exists():
                i += 1
            set_id = f"T_{i:03}_{starting_date}"
        else:
            i = 0
            id = same_tour.first().tour_ID.split("_")[0]
            while Tour.objects.filter(tour_ID=f"{id}_{starting_date}_{i}").exists():
                i += 1
            set_id = f"{id}_{starting_date}_{i}"

        tour_ID = set_id
        departure = self.request.data.get('departure') 
        vehicle = self.request.data.get('vehicle') 
        seat_num = self.request.data.get('seat_num') 
        price = self.request.data.get('price') 
        isActive = self.request.data.get('isActive') 
        bookingDeadline = datetime.strptime(self.request.data.get('bookingDeadline'), "%Y_%m_%d").date() 
        day_num = self.request.data.get('day_num') 
        night_num = self.request.data.get('night_num') 
        note = self.request.data.get('note') 
        schedule = self.request.data.get('schedule') 
        service = self.request.data.get('service') 
        place_ids = self.request.data.get('place') 
        random_staff = Staff.objects.order_by('?').first()

        places = Place.objects.filter(place_ID__in=place_ids)

        tour = {
            'tour_ID': tour_ID,
            'name': name,
            'departure': departure,
            'vehicle': vehicle,
            'seat_num': seat_num,
            'price': price,
            'isActive': isActive,
            'starting_date': starting_date,
            'bookingDeadline': bookingDeadline,
            'day_num': day_num,
            'night_num': night_num,
            'note': note,
            'schedule': json.dumps(schedule, ensure_ascii=False),
            'service': json.dumps(service, ensure_ascii=False),
            'staff': random_staff.pk,
            'places': [x.pk for x in places]
        }

        serializer = self.get_serializer(data=tour)

        if serializer.is_valid():
            serializer.save()  # Save the validated serializer data
            response_data = {'err': 0, 'msg': 'success', 'token': serializer.data}
            return Response(response_data, status=status.HTTP_201_CREATED)   
        else:
            # print(serializer.data)
            errors = serializer.errors
            return Response({'error': 1, 'msg': errors, 'token': None}, status=status.HTTP_400_BAD_REQUEST)
        
class TourUpdateAPIView(generics.UpdateAPIView):
    queryset = Tour.objects.all()
    serializer_class = TourUpdateSerializer

    def post(self, request, *args, **kwargs):
        tour_ID = self.request.data.get('tour_ID')
        tour_data = {
            'departure': self.request.data.get('departure'),
            'vehicle': self.request.data.get('vehicle'),
            'seat_num': self.request.data.get('seat_num'),
            'price': self.request.data.get('price'),
            'isActive': self.request.data.get('isActive'),
            'starting_date': datetime.strptime(self.request.data.get('starting_date'), "%Y_%m_%d").date(),
            'bookingDeadline': datetime.strptime(self.request.data.get('bookingDeadline'), "%Y_%m_%d").date(),
            'day_num': self.request.data.get('day_num'),
            'night_num': self.request.data.get('night_num'),
            'note': self.request.data.get('note'),
            'schedule': json.dumps(self.request.data.get('schedule'), ensure_ascii=False),
            'service': json.dumps(self.request.data.get('service'), ensure_ascii=False),
        }

        serializer = self.get_serializer(data=tour_data)

        if serializer.is_valid():
            update_tour = Tour.objects.get(pk=tour_ID)

            for att, value in tour_data.items():
                if value is not None:
                    setattr(update_tour, att, value)

            update_tour.save()  # Save the modified tour instance

            return Response({'err': 0}, status=status.HTTP_200_OK)
        else:
            return Response({'err': 1, 'msg': serializer.errors}, status=status.HTTP_200_OK)