from django.db import models


class ProfilePicture(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='profile_picture')
    file = models.ForeignKey('File', on_delete=models.CASCADE, related_name='user_profile_pictures')

    def __str__(self):
        return f"Profile Picture for {self.user.first_name} {self.user.last_name}"
