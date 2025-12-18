from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class Supplementary(ABSMODEL):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='supplementary')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='supplementary_files',null=True,blank=True)

    def __str__(self):
        return f"{self.name}: {self.description}"
