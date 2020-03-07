from django.shortcuts import render

# Create your views here.
import pyrebase
import datetime
from .models import Donor
from .serializers import DonorSerializer, DonorSerializerFirebase
from rest_framework import generics, views
from rest_framework.response import Response

config = {
'apiKey': "",
'authDomain': "nextmeal-269801.firebaseapp.com",
'databaseURL': "https://nextmeal-269801.firebaseio.com",
'projectId': "nextmeal-269801",
'storageBucket': "nextmeal-269801.appspot.com",
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

# restaurant = {
#     "restaurant_name": "Gagan Palace",
#     "address": "33 S White Horse Pike, Stratford, NJ 08084",
#     "food_available": "indian food",
#     "potential_allergies": "",
#     "location": [39.832598, -75.003377],
#     "food_available_start_time": datetime.time(7, 00, 00).__str__(),
#     "food_available_end_time": datetime.time(8, 00, 00).__str__()
# }
# db.child("restaurants").child(restaurant["restaurant_name"]).set(restaurant)
#
# all_agents = db.child("restaurants").get().val()
# print(all_agents['Gagan Palace']["restaurant_name"])


# class DonorListCreate(generics.ListCreateAPIView):
#     queryset = Donor.objects.all()
#     serializer_class = DonorSerializer

class DonorListCreateFirebase(views.APIView):
    def get(self, request):
        yourdata = db.child("restaurants").get().val()
        results = []
        for i in yourdata:
            results.append(DonorSerializerFirebase(yourdata[i]).data)
        return Response(results)

    def post(self, request):
        #TODO: Deletion from database.
        data = request.data
        db.child("restaurants").child(data["restaurant_name"]).set(data)
        return Response(data)


