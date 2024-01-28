import json
from django.db import models
from django_mysql.models import ListCharField
from django.core.validators import MinValueValidator, MaxValueValidator
#from django_cryptography.fields import encrypt

class Manager(models.Model):
    manager_ID = models.AutoField(primary_key=True)
    email = models.EmailField(null=False, unique=True)
    password = models.CharField(max_length=50, null=False)

class Staff(models.Model):
    staff_ID = models.AutoField(primary_key=True)
    email = models.EmailField(null=False, unique=True)
    phone_no = models.CharField(max_length=10)
    dateOfBirth = models.DateField()
    isActive = models.BooleanField()
    gender = models.CharField(max_length=1)
    lastName = models.CharField(max_length=100, null=False)
    firstName = models.CharField(max_length=100, null=False)
    encryp_pass = models.CharField(max_length=50, null=False)
    managerID = models.ForeignKey(Manager, on_delete=models.CASCADE)

class Place(models.Model):
    place_ID = models.AutoField(primary_key=True)
    province = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=1000, null=False)
    name = models.CharField(max_length = 100, null=False, unique=True)

class PlaceImages(models.Model):
    images = models.ImageField(upload_to='uploads/%Y/%m')
    place_ID = models.ForeignKey(Place, on_delete=models.CASCADE)

class Customer(models.Model):
    customer_ID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, null=False, unique=True)
    password = models.CharField(max_length=20, null=False)
    phone_no = models.CharField(max_length=10, null=False, unique=True)
    email = models.EmailField(max_length=50, null=False, unique=True)

class Tour(models.Model):
    tour_ID = models.AutoField(primary_key=True)
    departure = models.CharField(max_length=50, null=False)
    vehicle = ListCharField(
        base_field=models.CharField(max_length=30, null=False),
        size=10,
        max_length=(30 * 12),
    )
    seat_num = models.IntegerField(default=0)
    price = models.IntegerField(null=False)
    isActive = models.BooleanField(null=False)
    starting_date = models.DateField(null=False)
    bookingDeadline = models.DateField(null=False)
    day_num = models.IntegerField(null=False)
    night_num = models.IntegerField(null=False)
    note = models.CharField(max_length=100)
    places = models.ManyToManyField(Place)

class TourSchedule(models.Model):
    tour_ID = models.OneToOneField(Tour, on_delete=models.CASCADE)
    TSchedule = ListCharField(
        base_field=models.CharField(max_length=1000),
        size=10,
        max_length=(1000 * 12),
    )

class TourService(models.Model):
    tour_ID = models.ManyToManyField(Tour)
    TService = ListCharField(
        base_field=models.CharField(max_length=200, null=False),
        size=10,
        max_length=(200 * 12),
    )

class Customer_views_Place(models.Model):
    place_ID = models.ForeignKey(Place, on_delete=models.CASCADE)
    user_ID = models.ForeignKey(Customer, on_delete=models.CASCADE)

class Feedback(models.Model):
    feedback_ID = models.AutoField(primary_key=True)
    ratings = models.IntegerField(
        null=False,
        validators=[
            MinValueValidator(limit_value=1),
            MaxValueValidator(limit_value=5)
        ]
    )
    reviews = models.CharField(max_length=200, blank=True)
    datetime = models.DateTimeField(auto_now_add=True, editable=False)
    user_ID = models.ForeignKey(Customer, on_delete=models.CASCADE)
    tour_ID = models.ForeignKey(Tour, on_delete=models.CASCADE)

class Order(models.Model):
    order_ID = models.AutoField(primary_key=True)
    pay_method = models.CharField(max_length=20, null=False)
    user_ID = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(null=False, unique=True)
    name = models.CharField(max_length=30, null=False)
    phone_no = models.CharField(max_length=10, null=False, unique=True)
    date_time = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=200)
    ticker_num = models.IntegerField(null=False, default=1)
    tour_ID = models.ForeignKey(Tour, on_delete=models.SET_NULL, null=True)
    staff_ID = models.ForeignKey(Staff, on_delete=models.PROTECT, null=False)

class Staff_add_Order_of_Tour(models.Model):
    staff_ID = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    order_ID = models.ForeignKey(Order, on_delete=models.CASCADE)

class Request(models.Model):
    request_ID = models.AutoField(primary_key=True)
    status = models.CharField(max_length=20, null=False)
    date = models.DateTimeField(auto_now_add=True)
    reply = models.CharField(max_length=200)
    typ = models.CharField(max_length=30, null=False)
    tour_ID = models.ForeignKey(Tour, on_delete=models.CASCADE)
    staff_ID = models.ForeignKey(Staff, on_delete=models.CASCADE)
    manager_ID = models.ForeignKey(Manager, on_delete=models.CASCADE)

class EditRequest(models.Model):
    tour_draft = models.JSONField()
    request_ID = models.ForeignKey(Request, null=False, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        try:
            tour_instance = Tour.objects.get(tour_ID=self.request_ID.tour_ID)
        except Tour.DoesNotExist:
            tour_instance = None

        if tour_instance:
            self.tour_draft = json.dumps(self.tour_data(tour_instance))

        super().save(*args, **kwargs)

    def tour_data(self, tour_instance):
        return {
            'tour_ID': {
                'data': tour_instance.tour_ID,
                'edited': False,
            },
            'departure': {
                'data': tour_instance.departure,
                'edited': False,
            },
            'vehicle': {
                'data': tour_instance.vehicle,
                'edited': False,
            },
            'seat_num': {
                'data': tour_instance.seat_num,
                'edited': False,
            },
            'price': {
                'data': tour_instance.price,
                'edited': False,
            },
            'isActive': {
                'data': tour_instance.isActive,
                'edited': False,
            },
            'starting_date': {
                'data': tour_instance.starting_date,
                'edited': False,
            },
            'bookingDeadline': {
                'data': tour_instance.bookingDeadline,
                'edited': False,
            },
            'day_num': {
                'data': tour_instance.day_num,
                'edited': False,
            },
            'night_num': {
                'data': tour_instance.night_num,
                'edited': False,
            },
            'note': {
                'data': tour_instance.note,
                'edited': False,
            }
        }
    
class AddRequest(models.Model):
    request_ID = models.ForeignKey(Request, null=False, on_delete=models.CASCADE)
    departure = models.CharField(max_length=50, null=False)
    vehicle = ListCharField(
        base_field=models.CharField(max_length=30),
        size=10,
        max_length=(30 * 12),
    )
    seat_num = models.IntegerField(default=0)
    price = models.IntegerField(null=False)
    isActive = models.BooleanField(null=False)
    starting_date = models.DateField(null=False)
    bookingDeadline = models.DateField(null=False)
    day_num = models.IntegerField(null=False)
    night_num = models.IntegerField(null=False)
    note = models.CharField(max_length=100)
    places = models.ManyToManyField(Place)

class CancelRequest(models.Model):
    request_ID = models.ForeignKey(Request, null=False, on_delete=models.CASCADE)
