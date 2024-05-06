from django.db import models


class ReferencesItemsContactItem(models.Model):
    references_items = models.ForeignKey('ReferenceItems', on_delete=models.CASCADE, related_name='contact_items')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=45)

    def __str__(self):
        return f"{self.key}: {self.value} ({self.type})"
