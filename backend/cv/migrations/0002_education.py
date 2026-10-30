from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [('cv', '0001_initial')]
    operations = [migrations.CreateModel(name='Education', fields=[('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), ('institution', models.CharField(max_length=200)), ('location', models.CharField(max_length=200)), ('area', models.CharField(blank=True, max_length=200)), ('study_type', models.CharField(max_length=100)), ('start_date', models.CharField(max_length=20)), ('end_date', models.CharField(max_length=20)), ('gpa', models.CharField(blank=True, max_length=50))])]
