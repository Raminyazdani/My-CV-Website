from django.db import models


class Experiences(models.Model):
    info = models.ForeignKey('Info', on_delete=models.CASCADE, related_name='experiences')

    def __str__(self):
        return f"Experiences related to {self.info.user.first_name}"
