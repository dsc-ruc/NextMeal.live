from django.shortcuts import render

# Create your views here.
import pyrebase
from .models import Donor
from .serializers import DonorSerializer
from rest_framework import generics

config = {
'apiKey': "AIzaSyCZFfQF3gL3bCnjNnTAabPeMrV8ShJhVEk",
'authDomain': "nextmeal-269801.firebaseapp.com",
'databaseURL': "https://nextmeal-269801.firebaseio.com",
'projectId': "nextmeal-269801",
'storageBucket': "nextmeal-269801.appspot.com",
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

lana = {"Actually": "Firebase is pretty slick", "Resturant": "Breath EZ", "Address": "Bum fuck no-where", "Food Available": "Whatever you want", "Allergies": "Whatever you have"}
db.child("test42").child("I hate Firebase").set(lana)


class DonorListCreate(generics.ListCreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer

class DonorListCreateFirebase(generics.ListCreateAPIView):
    queryset = Donor.objects.all()