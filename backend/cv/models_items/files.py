from django.db import models

from cv.models_items.ABSTRACT import ABSMODEL

class Files(ABSMODEL):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='files')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    file = models.FileField(null=True,blank=True, upload_to='files/')

    def __str__(self):
        return f"{self.name} ({self.type})"
