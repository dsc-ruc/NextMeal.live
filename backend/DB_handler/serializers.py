from rest_framework import serializers
from .models import Donor


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ('id', 'name_of_restaurant', 'location', 'address', 'food_available_start_time',
                  'food_available_end_time', 'food_available', 'potential_allergies')