from django.db import models


class Litratures(models.Model):
    id = models.AutoField(primary_key=True)
    experience = models.ForeignKey('Experiences', on_delete=models.CASCADE, related_name='litratures')
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
