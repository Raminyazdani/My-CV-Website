from django.db import models

from cv.models_items.ABSTRACT import ABSMODEL


class Courses(ABSMODEL):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='courses')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.CharField(max_length=255)
    exam_file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='exam_files', null=True,blank=True)
    certificate_file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='certificate_files', null=True,blank=True)

    def __str__(self):
        return f"Course related to experience {self.info}"
