from django.db import models


class WorkContacts(models.Model):
    work_items = models.ForeignKey('Works', on_delete=models.CASCADE, related_name='contacts')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"
