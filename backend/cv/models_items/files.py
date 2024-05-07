from django.db import models


class Files(models.Model):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='files')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    file = models.BinaryField()

    def __str__(self):
        return f"{self.name} ({self.type})"
