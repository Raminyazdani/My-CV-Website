from django.db import models


class ProfilePictures(models.Model):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='profile_pictures')
    file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='profile_pictures_files')

    def __str__(self):
        return f"Profile Picture for {self.user.first_name} {self.user.last_name}"
