from django.urls import path
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

# from mydata.views import MyTokenObtainPairView

from mydata.views import CustomerCreate
from mydata.views import CustomerLoginAPIView
from mydata.views import CustomerAddAllAPIView
from mydata.views import CustomerDeleteAllAPIView

from mydata.views import ManagerAddAllAPIView
from mydata.views import ManagerDeleteAllAPIView

from mydata.views import StaffAddAllAPIView
from mydata.views import StaffDeleteAllAPIView

from mydata.views import TourDetailAPIView, TourAddAllAPIView, TourSearchByStaffIDAPIView
from mydata.views import ToursGetAllConditionAPIView, TourGetByNameAPIView
from mydata.views import TourHighestRatingAPIView, TourCreateAPIView, TourUpdateAPIView

from mydata.views import PlaceAddAllAPIView
from mydata.views import PlaceImagesAddAllAPIView

from mydata.views import OrderAddAllViewAPI, OrderDeleteAllAPIView, OrderOfTourAPIView

from mydata.views import FeedbackAddAllAPIView, FeedbackDeleteAllAPIView

# from .views import get_info

from . import views

urlpatterns = [
    path('customer/add/', CustomerCreate.as_view(), name='create_customer'),
    path('customer/get/', CustomerLoginAPIView.as_view(), name='get_customer'),
    path('customer/add_all/', CustomerAddAllAPIView.as_view(), name='add_customers_api'),
    path('customer/delete_all/', CustomerDeleteAllAPIView.as_view(), name='customer_delete_all'),
    # mã hóa token
    # path('auth/refreshToken', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # giải mã token
    # path('customer/get_current', get_info, name='get_info'),

    path('manager/add_all/', ManagerAddAllAPIView.as_view(), name='manager_add_all'),

    path('staff/add_all/', StaffAddAllAPIView.as_view(), name='staff_add_all'),
    path('staff/delete_all/', StaffDeleteAllAPIView.as_view(), name='staff_delete_all'),

    path('place/add_all/', PlaceAddAllAPIView.as_view(), name = 'add_places_api'),
    path('place_images/add_all/', PlaceImagesAddAllAPIView.as_view(), name='place_images_add_all'),

    path('tour/get_by_id', TourDetailAPIView.as_view(), name='tour_detail'),
    path('tour/get_by_condition', ToursGetAllConditionAPIView.as_view(), name='tour_get_condition'),
    path('tour/get_by_staffID', TourSearchByStaffIDAPIView.as_view(), name='tour_for_staff'),
    path('tour/add', TourCreateAPIView.as_view(), name='tour_add'),
    path('tour/update', TourUpdateAPIView.as_view(), name='tour_update'),
    # tìm bằng staffID - condition
    
    path('tour/get_by_name', TourGetByNameAPIView.as_view(), name='tour_get_name'),
    path('tour/add_all/', TourAddAllAPIView.as_view(), name='tour_add_all'),
    path('tour/highest_ratings', TourHighestRatingAPIView.as_view(), name='tour_highest_ratings'),

    path('order/add_all/', OrderAddAllViewAPI.as_view(), name='order_add_all'),
    path('order/delete_all/', OrderDeleteAllAPIView.as_view(), name='order_delete_all'),
    path('order/of_tour', OrderOfTourAPIView.as_view(), name='order_of_tour'),

    path('feedback/add_all/', FeedbackAddAllAPIView.as_view(), name='feedback_add_all'),
    path('feedback/delete_all/', FeedbackDeleteAllAPIView.as_view(), name='feedback_delete_all'),
]