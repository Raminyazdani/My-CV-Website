from django.db import models


class EducationItem(models.Model):
    education = models.ForeignKey('Education', on_delete=models.CASCADE, related_name='education_items')
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    GPA = models.CharField(max_length=255)
    transcript_file = models.ForeignKey('File', on_delete=models.SET_NULL, null=True, related_name='transcript_files')

    def __str__(self):
        return f"{self.type} - {self.name} at {self.institute}"