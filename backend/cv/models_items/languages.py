from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class Languages(ABSMODEL):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='languages')
    lang = models.CharField(max_length=255)
    score_scale = models.CharField(max_length=255)
    score = models.CharField(max_length=255)
    exam = models.CharField(max_length=255, blank=True, null=True)
    exam_file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='language_exam',null=True,blank=True)

    def __str__(self):
        return f"{self.lang} - {self.score} on {self.score_scale}"
