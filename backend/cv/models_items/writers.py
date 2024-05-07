from django.db import models


class Writers(models.Model):
    id = models.AutoField(primary_key=True)
    literature = models.ForeignKey('Literatures', on_delete=models.CASCADE, related_name='writers')
    abbr = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    writer_type = models.CharField(max_length=255)
    writer_number = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
