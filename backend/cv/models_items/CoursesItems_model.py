from django.db import models


class CourseItems(models.Model):
    courses = models.ForeignKey('Courses', on_delete=models.CASCADE, related_name='course_items')
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    institute = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.CharField(max_length=255)
    exam_file = models.IntegerField()  # Assuming it links to a Files model or similar
    certificate_file = models.IntegerField()  # Assuming it links to a Files model or similar

    def __str__(self):
        return self.name
