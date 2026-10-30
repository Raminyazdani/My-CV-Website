from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [('cv', '0004_certificationissuer_certification')]
    operations = [migrations.CreateModel(name='Interest', fields=[('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), ('name', models.CharField(max_length=120, unique=True))]), migrations.CreateModel(name='Project', fields=[('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), ('title', models.CharField(max_length=200)), ('description', models.TextField())]), migrations.CreateModel(name='SoftSkill', fields=[('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), ('name', models.CharField(max_length=100, unique=True))])]
