from django.db import models
from cv.models_items.ABSTRACT import ABSMODEL


class ProfilePictures(ABSMODEL):
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='profile_pictures')
    file = models.ForeignKey('Files', on_delete=models.CASCADE, related_name='profile_pictures_files',null=True,blank=True)

    def __str__(self):
        return f"Profile Picture for {self.user.first_name} {self.user.last_name}"
