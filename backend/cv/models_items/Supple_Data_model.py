from django.db import models


class SuppleData(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='supple_data')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    file = models.ForeignKey('File', on_delete=models.CASCADE, related_name='supple_data_files')

    def __str__(self):
        return f"{self.name}: {self.description}"
