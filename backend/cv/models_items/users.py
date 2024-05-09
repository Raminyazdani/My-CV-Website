from django.db import models
import datetime

from cv.managers import UserDataManager
from cv.models_items.ABSTRACT import ABSMODEL


class Users(ABSMODEL):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()

    website_data = UserDataManager()
    objects = models.Manager()  # This maintains the default manager.

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def is_birthday_today(self):
        return self.date_of_birth == datetime.date.today()
