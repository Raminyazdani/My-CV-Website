from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class Projects(ABSMODEL):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    project_file = models.ForeignKey('Files', on_delete=models.SET_NULL, null=True, blank=True,
                                     related_name='project_files')

    def __str__(self):
        return self.title
