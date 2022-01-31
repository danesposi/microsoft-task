from django.http import HttpResponse
from rest_framework import status

def rearrange(self, request):
    try:
        for item in request.data:
            obj = self.queryset.filter(id=item["id"])[0]
            obj.order = item["order"]
            obj.save()
    except Exception as e:
        return HttpResponse(status.HTTP_400_BAD_REQUEST)
    return HttpResponse(status.HTTP_200_OK)