from django.db import models


class Works(models.Model):
    experiences = models.ForeignKey('Experiences', on_delete=models.CASCADE, related_name='works')

    def __str__(self):
        return f"Works related to experience {self.experiences_id}"
