from django.db import models

# Create your models here.
class Donor(models.Model):
    name_of_restaurant = models.CharField(max_length=1000)
    location = models.CharField(max_length=1000)
    address = models.CharField(max_length=1000)
    food_available_start_time = models.TimeField()
    food_available_end_time = models.TimeField()
    food_available = models.CharField(max_length=1000)
    potential_allergies = models.CharField(max_length=1000)