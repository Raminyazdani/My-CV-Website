from django.db import models

from cv.models_items.ABSTRACT import ABSMODEL

class SkillsItems(ABSMODEL):
    skills = models.ForeignKey('Skills', on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.type}: {self.name}"
