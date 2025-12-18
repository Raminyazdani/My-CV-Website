from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class WorkContacts(ABSMODEL):
    work_items = models.ForeignKey('Works', on_delete=models.CASCADE, related_name='contacts')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"
