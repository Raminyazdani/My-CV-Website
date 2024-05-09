from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class Works(ABSMODEL):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='works')
    position = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    proof_file = models.ForeignKey('Files', on_delete=models.SET_NULL, null=True, blank=True, related_name='proof_files')
    def __str__(self):
        return f"{self.position} at {self.institute}"