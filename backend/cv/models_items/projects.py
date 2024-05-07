from django.db import models


class Projects(models.Model):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    url = models.CharField(max_length=255)

    def __str__(self):
        return self.title
