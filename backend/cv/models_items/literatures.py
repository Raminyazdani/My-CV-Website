from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class Literatures(ABSMODEL):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='literatures')
    title = models.CharField(max_length=255)
    journal = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    url = models.URLField()
    submission = models.BooleanField()
    submission_date = models.DateTimeField()
    isbn = models.CharField(max_length=255, blank=True, null=True)
    doi = models.CharField(max_length=255, blank=True, null=True)
    file = models.ForeignKey('Files', on_delete=models.SET_NULL, null=True, blank=True, related_name='literature_files')
    def __str__(self):
        return self.title
