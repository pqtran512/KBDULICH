from django.contrib import admin
from mydata.models import Manager, Staff, Place, PlaceImages, Tour, TourSchedule, TourService, Order, Request, Feedback
from mydata.models import AddRequest, EditRequest, CancelRequest, Staff_add_Order_of_Tour, Customer, Customer_views_Place

# Register your models here.
admin.site.register(Manager)
admin.site.register(Staff)
admin.site.register(Place)
admin.site.register(PlaceImages)
admin.site.register(Tour)
admin.site.register(TourSchedule)
admin.site.register(TourService)
admin.site.register(Order)
admin.site.register(Request)
admin.site.register(Feedback)
admin.site.register(AddRequest)
admin.site.register(EditRequest)
admin.site.register(CancelRequest)
admin.site.register(Staff_add_Order_of_Tour)
admin.site.register(Customer)
admin.site.register(Customer_views_Place)
