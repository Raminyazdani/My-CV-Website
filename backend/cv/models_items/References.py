from django.db import models


class References(models.Model):
    info = models.ForeignKey('Info', on_delete=models.CASCADE, related_name='references')

    def __str__(self):
        return f"References for {self.info.user.first_name}"
