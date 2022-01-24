from django.db import models

# Create your models here.

class List(models.Model):
    title = models.CharField(max_length=300, null=False, default="List title")

    def __str__(self):
        return self.title
    

class Task(models.Model):
    title = models.CharField(max_length=300, null=False, default="Task title")
    note = models.CharField(max_length=300, null=True)
    important = models.BooleanField(default=False)
    done = models.BooleanField(default=False)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Step(models.Model):
    title = models.CharField(max_length=300, null=False, default="Step title")
    done = models.BooleanField(default=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
