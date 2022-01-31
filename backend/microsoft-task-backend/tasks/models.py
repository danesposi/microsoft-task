from django.db import models

class List(models.Model):
    title = models.CharField(max_length=300, null=False, default="List title")
    order = models.IntegerField(default=1000)

    def __str__(self):
        return self.title
    

class Task(models.Model):
    title = models.CharField(max_length=300, null=False, default="Task title")
    note = models.CharField(max_length=300, null=False, default="")
    important = models.BooleanField(default=False)
    done = models.BooleanField(default=False)
    order = models.IntegerField(default=1000)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Step(models.Model):
    title = models.CharField(max_length=300, null=False, default="Step title")
    done = models.BooleanField(default=False)
    order = models.IntegerField(default=1000)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
