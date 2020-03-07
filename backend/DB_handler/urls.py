from django.urls import path
from . import views

urlpatterns = [
    path('api/donor/', views.DonorListCreate.as_view()),
]