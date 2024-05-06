from django.db import models


class Contact(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='contacts')

    def __str__(self):
        return f"Contact for {self.user.first_name} {self.user.last_name}"
