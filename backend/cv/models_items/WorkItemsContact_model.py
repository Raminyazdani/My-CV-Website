from django.db import models


class WorkItemsContact(models.Model):
    work_items = models.ForeignKey('WorkItems', on_delete=models.CASCADE, related_name='contacts')

    def __str__(self):
        return f"Contact for work item {self.work_items_id}"
