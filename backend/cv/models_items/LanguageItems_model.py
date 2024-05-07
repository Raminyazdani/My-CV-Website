from django.db import models


class LanguagesItems(models.Model):
    languages = models.ForeignKey('Languages', on_delete=models.CASCADE, related_name='languages_items')
    lang = models.CharField(max_length=255)
    score_scale = models.CharField(max_length=255)
    score = models.CharField(max_length=255)
    exam = models.CharField(max_length=255, blank=True, null=True)
    exam_file = models.ForeignKey('File', on_delete=models.CASCADE, related_name='language_exams')

    def __str__(self):
        return f"{self.lang} - {self.score} on {self.score_scale}"
