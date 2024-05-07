from django.db import models


class Infos(models.Model):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='infos')  # Adjust the reference if needed
    type = models.CharField(max_length=45, null=True)
    bio = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"Infos for {self.user.first_name} {self.user.last_name} - Type: {self.type}"
