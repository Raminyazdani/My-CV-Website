from django.db import models

class Phone(models.Model):
    country_code = models.CharField(max_length=10)
    number = models.CharField(max_length=20)
    formatted = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.formatted or f'{self.country_code} {self.number}'

class Location(models.Model):
    address = models.CharField(max_length=255, blank=True, null=True)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    region = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.city}, {self.country}'

class BasicInfo(models.Model):
    name = models.CharField(max_length=100)
    label = models.CharField(max_length=200, help_text='Comma-separated labels, e.g. Biotechnologist,Developer')
    email = models.EmailField()
    phone = models.OneToOneField(Phone, on_delete=models.CASCADE, related_name='basicinfo')
    birth_date = models.DateField(blank=True, null=True)
    summary = models.TextField()
    locations = models.ManyToManyField(Location, blank=True, related_name='basicinfo')
    profile_picture_url = models.URLField(blank=True, null=True)
    cover_picture_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    network = models.CharField(max_length=100)
    username = models.CharField(max_length=150, blank=True, null=True)
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.network} ({self.username})' if self.username else self.network

class Education(models.Model):
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    area = models.CharField(max_length=200, blank=True)
    study_type = models.CharField(max_length=100)
    start_date = models.CharField(max_length=20)
    end_date = models.CharField(max_length=20)
    gpa = models.CharField(max_length=50, blank=True)
    type_key = models.CharField(max_length=300, blank=True, help_text='Comma-separated tags for this education entry.')

    def __str__(self):
        return f'{self.institution} ({self.study_type})'

class Language(models.Model):
    language = models.CharField(max_length=50)

    def __str__(self):
        return self.language

class Proficiency(models.Model):
    language = models.OneToOneField(Language, related_name='proficiency', on_delete=models.CASCADE)
    level = models.CharField(max_length=50)
    CEFR = models.CharField(max_length=10, blank=True, null=True)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.language.language} ({self.level})'

class LanguageCertification(models.Model):
    language = models.ForeignKey(Language, related_name='certifications', on_delete=models.CASCADE)
    test = models.CharField(max_length=100, blank=True, null=True)
    organization = models.CharField(max_length=100, blank=True, null=True)
    overall = models.CharField(max_length=20, blank=True, null=True)
    reading = models.CharField(max_length=20, blank=True, null=True)
    listening = models.CharField(max_length=20, blank=True, null=True)
    writing = models.CharField(max_length=20, blank=True, null=True)
    speaking = models.CharField(max_length=20, blank=True, null=True)
    examDate = models.CharField(max_length=20, blank=True, null=True)
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.language.language} - {self.test or 'Certification'}"

class CertificationIssuer(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Certification(models.Model):
    issuer = models.ForeignKey(CertificationIssuer, related_name='certifications', on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    date = models.CharField(max_length=20, blank=True)
    duration = models.CharField(max_length=50, blank=True)
    certificate = models.BooleanField(default=False)
    url = models.URLField(blank=True, null=True)
    type_key = models.CharField(max_length=300, blank=True, help_text='Comma-separated tags for this certification entry.')

    def __str__(self):
        return f'{self.name} ({self.issuer.name})'

class SoftSkill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    type_key = models.CharField(max_length=300, blank=True, help_text='Comma-separated tags for this certification entry.')

    def __str__(self):
        return self.title

class Interest(models.Model):
    name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        return self.name

class Publication(models.Model):
    title = models.CharField(max_length=400)
    type = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    correspondent = models.CharField(max_length=150, blank=True, null=True)
    institution = models.CharField(max_length=150, blank=True, null=True)
    faculty = models.CharField(max_length=150, blank=True, null=True)
    school = models.CharField(max_length=150, blank=True, null=True)
    isbn = models.CharField(max_length=40, blank=True, null=True)
    submission_date = models.CharField(max_length=40, blank=True, null=True)
    authors = models.TextField(help_text='Comma-separated list of authors (or use ArrayField with PostgreSQL).')
    supervisors = models.TextField(blank=True, null=True, help_text='Comma-separated list of supervisors (if any).')
    url = models.URLField(blank=True, null=True)
    type_key = models.CharField(max_length=300, blank=True, help_text='Comma-separated tags for this publication entry.')

    def get_authors_list(self):
        return [a.strip() for a in self.authors.split(',')] if self.authors else []

    def get_supervisors_list(self):
        return [s.strip() for s in self.supervisors.split(',')] if self.supervisors else []

    def __str__(self):
        return f'{self.title} ({self.type})'

class Experience(models.Model):
    role = models.CharField(max_length=200)
    institution = models.CharField(max_length=150, blank=True, null=True)
    duration = models.CharField(max_length=100)
    primary_focus = models.CharField(max_length=300, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.role} @ {self.institution or '—'}"

class Reference(models.Model):
    name = models.CharField(max_length=120)
    position = models.CharField(max_length=180, blank=True, null=True)
    department = models.CharField(max_length=200, blank=True, null=True)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=120)
    url = models.URLField(blank=True, null=True)
    type_key = models.CharField(max_length=300, blank=True, help_text='Comma-separated tags for this reference entry.')

    def __str__(self):
        return self.name

class ReferenceEmail(models.Model):
    reference = models.ForeignKey(Reference, related_name='emails', on_delete=models.CASCADE)
    email = models.EmailField()

    def __str__(self):
        return self.email

class ReferencePhone(models.Model):
    reference = models.ForeignKey(Reference, related_name='phones', on_delete=models.CASCADE)
    formatted = models.CharField(max_length=40, blank=True, null=True)
    countryCode = models.CharField(max_length=10, blank=True, null=True)
    number = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.formatted or self.number or ''

class SkillCategory(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.name

class SkillSubcategory(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='subcategories', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)

    class Meta:
        unique_together = ('category', 'name')

    def __str__(self):
        return f'{self.category.name} / {self.name}'

class Skill(models.Model):
    subcategory = models.ForeignKey(SkillSubcategory, related_name='skills', on_delete=models.CASCADE)
    long_name = models.CharField(max_length=150)
    short_name = models.CharField(max_length=60)
    type_key = models.CharField(max_length=200, blank=True, help_text='Comma-separated tags')

    def get_type_key_list(self):
        return [t.strip() for t in self.type_key.split(',')] if self.type_key else []

    def __str__(self):
        return self.short_name
