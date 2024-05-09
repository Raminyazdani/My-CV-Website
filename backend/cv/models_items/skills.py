from django.db import models

from cv.models_items.ABSTRACT import ABSMODEL


class Skills(ABSMODEL):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    parent_id = models.ForeignKey('Skills', on_delete=models.CASCADE, related_name='child', null=True, blank=True)

    def __str__(self):
        return self.name
