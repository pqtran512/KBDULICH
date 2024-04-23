# import json
from django.db import models
from django_mysql.models import ListCharField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Permission
#from django_cryptography.fields import encrypt

class Manager(models.Model):
    manager_ID = models.CharField(max_length=20, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='manager', null=True)
    email = models.EmailField(null=False, unique=True)
    password = models.CharField(max_length=50, null=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.user_id:
            self.user = User.objects.create_user(username=self.email, email=self.email, password=self.password, is_superuser=True)

    def delete(self, *args, **kwargs):
        # Delete associated User instance
        if self.user:
            self.user.delete()
        
        # Delete associated Token instance
        try:
            token = Token.objects.get(user=self.user)
            token.delete()
        except Token.DoesNotExist:
            pass
        
        # Call superclass delete method
        super().delete(*args, **kwargs)

class Staff(models.Model):
    staff_ID = models.CharField(max_length=20, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='staff', null=True)
    email = models.EmailField(null=False, unique=True)
    phone_no = models.CharField(max_length=10)
    dateOfBirth = models.DateField(null=False)
    isActive = models.IntegerField(default=1)
    gender = models.CharField(max_length=3)
    lastName = models.CharField(max_length=100, null=False)
    firstName = models.CharField(max_length=100, null=False)
    encryp_pass = models.CharField(max_length=50, null=False)
    managerID = models.ForeignKey(Manager, on_delete=models.CASCADE)
    firstLogin = models.BooleanField(default=True, null=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.user_id:
            self.user = User.objects.create_user(username=self.email, email=self.email, password=self.encryp_pass, is_staff=True)

    def delete(self, *args, **kwargs):
        # Delete associated User instance
        if self.user:
            self.user.delete()
        
        # Delete associated Token instance
        try:
            token = Token.objects.get(user=self.user)
            token.delete()
        except Token.DoesNotExist:
            pass
        
        # Call superclass delete method
        super().delete(*args, **kwargs)

class Place(models.Model):
    place_ID = models.CharField(max_length=20, primary_key=True)
    province = models.TextField()
    description = models.TextField(default="No information")
    name = models.TextField()

class PlaceImages(models.Model):
    images = models.URLField(max_length=500, default='', blank=True, null=True)
    place_ID = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='images')

class Customer(models.Model):
    customer_ID = models.CharField(max_length=20, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer', null=True)
    username = models.CharField(max_length=20, null=False, unique=True)
    password = models.CharField(max_length=20, null=False)
    phone_no = models.CharField(max_length=10, null=False, unique=True)
    email = models.EmailField(max_length=50, null=False, unique=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.user_id:
            self.user = User.objects.create_user(username=self.email, email=self.email, password=self.password)
            
            # customer_per = ['change_user', 'view_user', ]
            # permission = Permission.objects.get()

    def delete(self, *args, **kwargs):
        # Delete associated User instance
        if self.user:
            self.user.delete()
        
        # Delete associated Token instance
        try:
            token = Token.objects.get(user=self.user)
            token.delete()
        except Token.DoesNotExist:
            pass
        
        # Call superclass delete method
        super().delete(*args, **kwargs)
    
    def __str__(self):
        return self.customer_ID

class Tour(models.Model):
    tour_ID = models.CharField(max_length=20, primary_key=True)
    name = models.TextField(max_length=1000, null=False, default='Default Tour Name')
    departure = models.CharField(max_length=50, null=False)
    vehicle = models.TextField(null=False)
    seat_num = models.IntegerField(default=0)
    price = models.IntegerField(null=False)
    isActive = models.IntegerField(default=1)
    starting_date = models.DateField(null=False)
    bookingDeadline = models.DateField(null=False)
    day_num = models.IntegerField(null=False)
    night_num = models.IntegerField(null=False)
    note = models.CharField(max_length=100)
    schedule = models.TextField(default="Tour Schedule", null=False)
    service = models.TextField(default="Tour Service", null=False)
    places = models.ManyToManyField(Place)
    staff = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True)

class Customer_views_Place(models.Model):
    place_ID = models.ForeignKey(Place, on_delete=models.CASCADE)
    user_ID = models.ForeignKey(Customer, on_delete=models.CASCADE)

class Feedback(models.Model):
    feedback_ID = models.CharField(max_length=20, primary_key=True)
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
    tour_ID = models.CharField(max_length=20)

class Order(models.Model):
    order_ID = models.CharField(max_length=20, primary_key=True)
    pay_method = models.CharField(max_length=20, null=False)
    user_ID = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    email = models.EmailField(null=False, unique=True)
    name = models.CharField(max_length=30, null=False)
    phone_no = models.CharField(max_length=10, null=False, unique=True)
    date_time = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=200)
    ticket_num = models.IntegerField(null=False, default=1)
    tour_ID = models.ForeignKey(Tour, on_delete=models.SET_NULL, null=True)
    cancel_percent = models.IntegerField(default=0)
    cancel_datetime = models.DateTimeField(null=True)

class Request(models.Model):
    request_ID = models.CharField(max_length=20, primary_key=True)
    status = models.CharField(max_length=20, null=False)
    date = models.DateTimeField(auto_now_add=True)
    reply = models.CharField(max_length=200)
    typ = models.CharField(max_length=30, null=False)
    tour_ID = models.ForeignKey(Tour, on_delete=models.CASCADE)
    staff_ID = models.ForeignKey(Staff, on_delete=models.CASCADE)
    manager_ID = models.ForeignKey(Manager, on_delete=models.CASCADE)

class EditRequest(models.Model):
    tour_draft = models.TextField(default="No data", null=False)
    request_ID = models.ForeignKey(Request, null=False, on_delete=models.CASCADE)

    # def tour_data(self, tour_instance):
    #     return {
    #         'tour_ID': {
    #             'data': tour_instance.tour_ID,
    #             'edited': False,
    #         },
    #         'departure': {
    #             'data': tour_instance.departure,
    #             'edited': False,
    #         },
    #         'vehicle': {
    #             'data': tour_instance.vehicle,
    #             'edited': False,
    #         },
    #         'seat_num': {
    #             'data': tour_instance.seat_num,
    #             'edited': False,
    #         },
    #         'price': {
    #             'data': tour_instance.price,
    #             'edited': False,
    #         },
    #         'isActive': {
    #             'data': tour_instance.isActive,
    #             'edited': False,
    #         },
    #         'starting_date': {
    #             'data': tour_instance.starting_date,
    #             'edited': False,
    #         },
    #         'bookingDeadline': {
    #             'data': tour_instance.bookingDeadline,
    #             'edited': False,
    #         },
    #         'day_num': {
    #             'data': tour_instance.day_num,
    #             'edited': False,
    #         },
    #         'night_num': {
    #             'data': tour_instance.night_num,
    #             'edited': False,
    #         },
    #         'note': {
    #             'data': tour_instance.note,
    #             'edited': False,
    #         }
    #     }
    
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