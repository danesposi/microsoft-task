from email.policy import default
from os import stat
from django.http import HttpResponse
from . import models
from . import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend


class ListViewSet(ModelViewSet):
    queryset = models.List.objects.order_by("order")
    serializer_class = serializers.ListSerializer

    @action(methods=["POST"], detail=False)
    def rearrange(self, request):
        try:
            for item in request.data:
                obj = self.queryset.filter(id=item["id"])[0]
                obj.order = item["order"]
                obj.save()
        except Exception as e:
            return HttpResponse(status.HTTP_400_BAD_REQUEST)
        return HttpResponse(status.HTTP_200_OK)

class TaskViewSet(ModelViewSet):
    queryset = models.Task.objects.order_by("order")
    serializer_class = serializers.TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['list']

    @action(methods=["POST"], detail=False)
    def rearrange(self, request):
        try:
            for item in request.data:
                obj = self.queryset.filter(id=item["id"])[0]
                obj.order = item["order"]
                obj.save()
        except Exception as e:
            return HttpResponse(status.HTTP_400_BAD_REQUEST)
        return HttpResponse(status.HTTP_200_OK)


class StepViewSet(ModelViewSet):
    queryset = models.Step.objects.order_by("order")
    serializer_class = serializers.StepSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['task']

    @action(methods=["POST"], detail=False)
    def rearrange(self, request):
        try:
            for item in request.data:
                obj = self.queryset.filter(id=item["id"])[0]
                obj.order = item["order"]
                obj.save()
        except Exception as e:
            return HttpResponse(status.HTTP_400_BAD_REQUEST)
        return HttpResponse(status.HTTP_200_OK)
