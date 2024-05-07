from django.db import models


class Courses(models.Model):
    experiences = models.ForeignKey('Experiences', on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return f"Course related to experience {self.experiences_id}"
