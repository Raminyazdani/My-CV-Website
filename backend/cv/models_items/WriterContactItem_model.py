from django.db import models


class WritersContactItem(models.Model):
    id = models.AutoField(primary_key=True)
    writers = models.ForeignKey('Writers', on_delete=models.CASCADE, related_name='contact_items')
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"
