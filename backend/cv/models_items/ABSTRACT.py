from django.db import models


class ABSMODEL(models.Model):
    id = models.AutoField(primary_key=True)

    class Meta:
        abstract = True