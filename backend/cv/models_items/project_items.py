from django.db import models


class ProjectItems(models.Model):
    projects = models.ForeignKey('Projects', on_delete=models.CASCADE, related_name='datas')
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    url = models.CharField(max_length=255)
    project_file = models.IntegerField()  # assuming project_file references an ID in another table

    def __str__(self):
        return self.title
