from curses.ascii import HT
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework import routers
from . import viewsets

router = routers.SimpleRouter()
router.register(r'list', viewsets.ListViewSet)
router.register(r'task', viewsets.TaskViewSet)
router.register(r'step', viewsets.StepViewSet)

urlpatterns = router.urls + [
    
]