import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [('cv', '0003_language_languagecertification_proficiency')]
    operations = [migrations.CreateModel(name='CertificationIssuer', fields=[('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), ('name', models.CharField(max_length=200))]), migrations.CreateModel(name='Certification', fields=[('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), ('name', models.CharField(max_length=300)), ('date', models.CharField(blank=True, max_length=20)), ('duration', models.CharField(blank=True, max_length=50)), ('certificate', models.BooleanField(default=False)), ('issuer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certifications', to='cv.certificationissuer'))])]
