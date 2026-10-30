import json
from django.core.management.base import BaseCommand
from cv.models import Phone, Location, BasicInfo, Profile, Education, Language, Proficiency, LanguageCertification, CertificationIssuer, Certification, SoftSkill, Project, Interest, Publication, Experience, Reference, ReferenceEmail, ReferencePhone, SkillCategory, SkillSubcategory, Skill
from django.db import transaction

def str_or_none(x):
    if x is None:
        return None
    return str(x)

class Command(BaseCommand):
    help = 'Populates the database with CV data from cv_data.json.'

    @transaction.atomic
    def _import_cv(self, *args, **options):
        with open(options['input'], 'r', encoding='utf-8') as f:
            data = json.load(f)
        basics = data.get('basics', [])[0]
        phone_data = basics.get('phone', {})
        phone, _ = Phone.objects.get_or_create(country_code=phone_data.get('countryCode', ''), number=phone_data.get('number', ''), formatted=phone_data.get('formatted', ''))
        basicinfo, _ = BasicInfo.objects.get_or_create(name=basics['name'], label=','.join(basics.get('label', [])), email=basics.get('email', ''), phone=phone, birth_date=basics.get('birthDate', None), summary=basics.get('summary', ''))
        for loc in basics.get('location', []):
            location, _ = Location.objects.get_or_create(address=loc.get('address', ''), postal_code=loc.get('postalCode', ''), city=loc.get('city', ''), region=loc.get('region', ''), country=loc.get('country', ''))
            basicinfo.locations.add(location)
        pics = {p['type_of']: p['URL'] for p in basics.get('Pictures', []) if p.get('URL')}
        if 'profile' in pics:
            basicinfo.profile_picture_url = pics['profile']
        if 'cover' in pics:
            basicinfo.cover_picture_url = pics['cover']
        basicinfo.save()
        for prof in data.get('profiles', []):
            Profile.objects.get_or_create(network=prof.get('network', ''), username=prof.get('username', None), url=prof.get('url', None))
        for edu in data.get('education', []):
            Education.objects.get_or_create(institution=edu['institution'], location=edu['location'], area=edu.get('area', ''), study_type=edu.get('studyType', ''), start_date=edu.get('startDate', ''), end_date=edu.get('endDate', ''), gpa=edu.get('gpa', ''), type_key=','.join(edu.get('type_key', [])))
        for lang in data.get('languages', []):
            language, _ = Language.objects.get_or_create(language=lang['language'])
            prof = lang.get('proficiency', {})
            if prof:
                Proficiency.objects.update_or_create(language=language, defaults={'level': prof.get('level', ''), 'CEFR': prof.get('CEFR', ''), 'status': prof.get('status', '')})
            for cert in lang.get('certifications', []):
                LanguageCertification.objects.get_or_create(language=language, test=cert.get('test'), organization=cert.get('organization'), overall=str_or_none(cert.get('overall')), reading=str_or_none(cert.get('reading')), writing=str_or_none(cert.get('writing')), listening=str_or_none(cert.get('listening')), speaking=str_or_none(cert.get('speaking')), examDate=cert.get('examDate', ''), url=cert.get('URL'))
        for issuer_dict in data.get('certifications and courses', []):
            issuer, _ = CertificationIssuer.objects.get_or_create(name=issuer_dict['issuer'])
            for cert in issuer_dict['certifications']:
                Certification.objects.get_or_create(issuer=issuer, name=cert['name'], date=cert.get('date', ''), duration=cert.get('duration', ''), certificate=cert.get('certificate', False), url=cert.get('URL', None), type_key=','.join(cert.get('type_key', [])))
        for ss in data.get('softSkills', []):
            SoftSkill.objects.get_or_create(name=ss['name'])
        for proj in data.get('projects', []):
            Project.objects.get_or_create(title=proj['title'], description=proj['description'], type_key=','.join(proj.get('type_key', [])))
        for interest in data.get('interests', []):
            Interest.objects.get_or_create(name=interest['name'])
        for pub in data.get('publications', []):
            Publication.objects.get_or_create(title=pub['title'], type=pub.get('type', ''), status=pub.get('status', ''), correspondent=pub.get('correspondent', ''), institution=pub.get('institution', ''), faculty=pub.get('faculty', ''), school=pub.get('school', ''), isbn=pub.get('isbn', ''), submission_date=pub.get('submissionDate', ''), url=pub.get('URL', None), type_key=','.join(pub.get('type_key', [])), authors=','.join(pub.get('authors', [])), supervisors=','.join(pub.get('supervisors', [])) if pub.get('supervisors') else '')
        for exp in data.get('experiences', []):
            Experience.objects.get_or_create(role=exp.get('role', ''), institution=exp.get('institution', ''), duration=exp.get('duration', ''), primary_focus=exp.get('primaryFocus', ''), description=exp.get('description', ''))
        for ref in data.get('references', []):
            reference, _ = Reference.objects.get_or_create(name=ref['name'], position=ref.get('position', ''), department=ref.get('department', ''), institution=ref['institution'], location=ref.get('location', ''), url=ref.get('URL', None), type_key=','.join(ref.get('type_key', [])))
            for email in ref.get('email', []):
                ReferenceEmail.objects.get_or_create(reference=reference, email=email)
            for phone in ref.get('phone', []) or []:
                ReferencePhone.objects.get_or_create(reference=reference, formatted=phone.get('formatted', ''), countryCode=phone.get('countryCode', ''), number=phone.get('number', ''))
        skills = data.get('skills', {})
        for category_name, subcategories in skills.items():
            category, _ = SkillCategory.objects.get_or_create(name=category_name)
            for subcategory_name, skill_list in subcategories.items():
                subcat, _ = SkillSubcategory.objects.get_or_create(category=category, name=subcategory_name)
                for skill_dict in skill_list:
                    Skill.objects.get_or_create(subcategory=subcat, long_name=skill_dict.get('long_name', ''), short_name=skill_dict.get('short_name', ''), type_key=','.join(skill_dict.get('type_key', [])))
        self.stdout.write(self.style.SUCCESS('All CV data imported successfully!'))

    def add_arguments(self, parser):
        parser.add_argument('--input', required=True, help='Owner-supplied private CV JSON path')
        parser.add_argument('--write', action='store_true', help='Import reviewed local input into your configured database')

    def handle(self, *args, **options):
        if not options.get('write'):
            self.stdout.write('Plan only: no CV input read and no database import performed. Use --input PATH --write explicitly.')
            return
        return self._import_cv(*args, **options)
