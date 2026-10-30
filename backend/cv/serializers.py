from rest_framework import serializers
from .models import *

class ReferenceEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReferenceEmail
        fields = '__all__'

class ReferencePhoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReferencePhone
        fields = '__all__'

class ReferenceSerializer(serializers.ModelSerializer):
    emails = ReferenceEmailSerializer(many=True, read_only=True)
    phones = ReferencePhoneSerializer(many=True, read_only=True)

    class Meta:
        model = Reference
        fields = '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()
    supervisors = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = '__all__'

    def get_authors(self, obj):
        return obj.get_authors_list()

    def get_supervisors(self, obj):
        return obj.get_supervisors_list()

class ExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Experience
        fields = '__all__'

class SoftSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = SoftSkill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'

class InterestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Interest
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Certification
        fields = '__all__'

class CertificationIssuerSerializer(serializers.ModelSerializer):
    certifications = CertificationSerializer(many=True, read_only=True)

    class Meta:
        model = CertificationIssuer
        fields = '__all__'

class PhoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Phone
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'

class BasicInfoSerializer(serializers.ModelSerializer):
    phone = PhoneSerializer()
    locations = LocationSerializer(many=True)

    class Meta:
        model = BasicInfo
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = '__all__'

class LanguageCertificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = LanguageCertification
        fields = '__all__'

class ProficiencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Proficiency
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    proficiency = ProficiencySerializer(read_only=True)
    certifications = LanguageCertificationSerializer(many=True, read_only=True)

    class Meta:
        model = Language
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    type_key = serializers.SerializerMethodField()

    def get_type_key(self, obj):
        return obj.get_type_key_list()

    class Meta:
        model = Skill
        fields = '__all__'

class SkillSubcategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillSubcategory
        fields = '__all__'

class SkillCategorySerializer(serializers.ModelSerializer):
    subcategories = SkillSubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = '__all__'

class GetFullSkillsSerializer(serializers.Serializer):
    skills = serializers.SerializerMethodField()

    def get_skills(self, obj=None):
        data = {}
        categories = SkillCategory.objects.prefetch_related('subcategories__skills').all()
        for category in categories:
            subcategory_data = {}
            for sub in category.subcategories.all():
                skill_qs = sub.skills.all()
                if skill_qs.exists():
                    serialized_skills = SkillSerializer(skill_qs, many=True).data
                    subcategory_data[sub.name] = serialized_skills
            if subcategory_data:
                data[category.name] = subcategory_data
        return data
