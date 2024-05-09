from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class Educations(ABSMODEL):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='educations')
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    GPA = models.CharField(max_length=255)
    transcript_file = models.ForeignKey('Files', on_delete=models.SET_NULL, null=True,blank=True, related_name='transcript_files')
    degree_file = models.ForeignKey('Files', on_delete=models.SET_NULL, null=True,blank=True, related_name='degree_files')

    def __str__(self):
        return f"{self.type} - {self.name} at {self.institute}"
