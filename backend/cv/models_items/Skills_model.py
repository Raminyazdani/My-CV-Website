from django.db import models


class Skills(models.Model):
    experiences = models.ForeignKey('Experiences', on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    parent_id = models.IntegerField(null=True)  # assuming it can be null to handle top-level skills

    def __str__(self):
        return self.name
