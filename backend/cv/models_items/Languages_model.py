from django.db import models


class Languages(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='languages')

    def __str__(self):
        return f"Languages for {self.user.first_name} {self.user.last_name}"
