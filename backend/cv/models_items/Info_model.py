from django.db import models


class Info(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='info')
    type = models.CharField(max_length=45, null=True)
    bio = models.CharField(max_length=255, null=True)
    experiences = models.IntegerField(null=True)

    def __str__(self):
        return f"Info for {self.user.username} - Type: {self.type}"
