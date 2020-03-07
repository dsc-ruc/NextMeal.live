from django.shortcuts import render

# Create your views here.
from .models import Donor
from .serializers import DonorSerializer
from rest_framework import generics

class DonorListCreate(generics.ListCreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer