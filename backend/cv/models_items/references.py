from django.db import models


class References(models.Model):
    info = models.ForeignKey('Infos', on_delete=models.CASCADE, related_name='references')
    abbr = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    reference_file = models.ForeignKey('Files', on_delete=models.SET_NULL, null=True, related_name='reference_files')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.position}"
