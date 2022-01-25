from rest_framework import serializers
from . import models

class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.List
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = '__all__'
    

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Step
        fields = '__all__'