from . import models
from . import serializers
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

class ListViewSet(ModelViewSet):
    queryset = models.List.objects.all()
    serializer_class = serializers.ListSerializer


class TaskViewSet(ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['list']


class StepViewSet(ModelViewSet):
    queryset = models.Step.objects.all()
    serializer_class = serializers.StepSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['task']
