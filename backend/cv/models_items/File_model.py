from django.db import models


class File(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='files')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    file = models.BinaryField()

    def __str__(self):
        return f"{self.name} ({self.type})"
