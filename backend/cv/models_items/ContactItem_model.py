from django.db import models


class ContactItem(models.Model):
    contact = models.ForeignKey('Contact', on_delete=models.CASCADE, related_name='items', null=True)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=45)

    def __str__(self):
        return f"{self.key}: {self.value} ({self.type})"
