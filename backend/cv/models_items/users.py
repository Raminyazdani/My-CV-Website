from django.db import models
import datetime


class Users(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def is_birthday_today(self):
        return self.date_of_birth == datetime.date.today()
