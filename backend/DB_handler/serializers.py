from rest_framework import serializers
from .models import Donor


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ('id', 'name_of_restaurant', 'location_x', 'location_y', 'address', 'food_available_start_time',
                  'food_available_end_time', 'food_available', 'potential_allergies')


class DonorSerializerFirebase(serializers.Serializer):
    restaurant_name = serializers.CharField()
    location = serializers.ListField()
    address = serializers.CharField()
    food_available_start_time = serializers.TimeField()
    food_available_end_time = serializers.TimeField()
    food_available = serializers.CharField()
    potential_allergies = serializers.CharField()