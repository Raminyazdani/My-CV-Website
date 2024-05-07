from django.db import models


class WorkItems(models.Model):
    works = models.ForeignKey('Works', on_delete=models.CASCADE, related_name='work_items')
    position = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    proof_file = models.IntegerField()  # assuming proof_file references an ID in another table

    def __str__(self):
        return f"{self.position} at {self.institute}"
