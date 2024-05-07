from django.db import models


class Literatures(models.Model):
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='literatures')
    title = models.CharField(max_length=255)
    journal = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    url = models.URLField()
    submission = models.BooleanField()
    submission_date = models.DateTimeField()
    isbn = models.CharField(max_length=255, blank=True, null=True)
    doi = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title
