from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_GET
from django.conf import settings
import os

class BasicInfoList(generics.ListAPIView):
    queryset = BasicInfo.objects.all()
    serializer_class = BasicInfoSerializer

class PhoneList(generics.ListAPIView):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class EducationList(generics.ListAPIView):
    queryset = Education.objects.all().order_by('-start_date')
    serializer_class = EducationSerializer

class LanguageList(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class ProficiencyList(generics.ListAPIView):
    queryset = Proficiency.objects.all()
    serializer_class = ProficiencySerializer

class LanguageCertificationList(generics.ListAPIView):
    queryset = LanguageCertification.objects.all()
    serializer_class = LanguageCertificationSerializer

class CertificationIssuerList(generics.ListAPIView):
    queryset = CertificationIssuer.objects.all()
    serializer_class = CertificationIssuerSerializer

class CertificationList(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class SoftSkillList(generics.ListAPIView):
    queryset = SoftSkill.objects.all()
    serializer_class = SoftSkillSerializer

class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class InterestList(generics.ListAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer

class PublicationList(generics.ListAPIView):
    queryset = Publication.objects.all().order_by('-submission_date', 'title')
    serializer_class = PublicationSerializer

class ExperienceList(generics.ListAPIView):
    queryset = Experience.objects.all().order_by('-duration')
    serializer_class = ExperienceSerializer

class ReferenceList(generics.ListAPIView):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer

class SkillCategoryList(generics.ListAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer

class SkillSubcategoryList(generics.ListAPIView):
    queryset = SkillSubcategory.objects.all()
    serializer_class = SkillSubcategorySerializer

class SkillList(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class GetFullSkillsView(APIView):

    def get(self, request, *args, **kwargs):
        serializer = GetFullSkillsSerializer().get_skills()
        return Response(serializer)

class BasicInfoDetail(generics.RetrieveAPIView):
    queryset = BasicInfo.objects.all()
    serializer_class = BasicInfoSerializer

class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class EducationDetail(generics.RetrieveAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class PublicationDetail(generics.RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

class ExperienceDetail(generics.RetrieveAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ProjectDetail(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ReferenceDetail(generics.RetrieveAPIView):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer

class SkillCategoryDetail(generics.RetrieveAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer

class SkillSubcategoryDetail(generics.RetrieveAPIView):
    queryset = SkillSubcategory.objects.all()
    serializer_class = SkillSubcategorySerializer

class SkillDetail(generics.RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

@require_GET
def json_value_view(request):
    key = request.GET.get('key')
    file_path = os.path.join(settings.BASE_DIR, 'cv', 'static', 'my_cv.json')
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found.'}, status=404)
    if key:
        if key in data:
            return JsonResponse({key: data[key]})
        else:
            return JsonResponse({'error': f"Key '{key}' not found."}, status=404)
    else:
        return JsonResponse(data)
