from django.db import models


class SkillsItem(models.Model):
    skills = models.ForeignKey('Skills', on_delete=models.CASCADE, related_name='skill_items')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.type}: {self.name}"
