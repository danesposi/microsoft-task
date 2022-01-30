from os import stat
from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
# Create your tests here.

class ListTests(APITestCase):
    def test_list_items(self):

        response = self.client.get('/api/v1/list/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TaskTests(APITestCase):
    def test_tasks_items(self):

        response = self.client.get('/api/v1/task/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class StepTests(APITestCase):
    def test_tasks_items(self):

        response = self.client.get('/api/v1/step/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
