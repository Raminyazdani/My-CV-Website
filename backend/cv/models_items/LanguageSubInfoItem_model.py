from django.db import models


class LanguagesSubInfoItems(models.Model):
    languages = models.ForeignKey('LanguagesItems', on_delete=models.CASCADE, related_name='sub_info_items')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"
