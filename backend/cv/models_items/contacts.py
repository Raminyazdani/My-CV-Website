from django.db import models


class Contacts(models.Model):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='contacts')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=45)

    def __str__(self):
        return f"{self.key}: {self.value} ({self.type})"