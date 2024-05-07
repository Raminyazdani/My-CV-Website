from django.db import models


class WorkItemsContactItems(models.Model):
    work_items_contact = models.ForeignKey('WorkItemsContact', on_delete=models.CASCADE, related_name='contact_items')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"
