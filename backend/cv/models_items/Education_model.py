from django.db import models


class Education(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='educations')

    def __str__(self):
        return f"Education Record for {self.user.first_name} {self.user.last_name}"
