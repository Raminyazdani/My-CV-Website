from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class LanguageItems(ABSMODEL):
    languages = models.ForeignKey('Languages', on_delete=models.CASCADE, related_name='datas')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"
