from django.db import models


class Languages(models.Model):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='languages')
    lang = models.CharField(max_length=255)
    score_scale = models.CharField(max_length=255)
    score = models.CharField(max_length=255)
    exam = models.CharField(max_length=255, blank=True, null=True)
    exam_file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='language_exam')

    def __str__(self):
        return f"{self.lang} - {self.score} on {self.score_scale}"
