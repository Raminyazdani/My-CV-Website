from django.db import models


class Info(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='info')  # Adjust the reference if needed
    type = models.CharField(max_length=45, null=True)
    bio = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"Info for {self.user.first_name} {self.user.last_name} - Type: {self.type}"
