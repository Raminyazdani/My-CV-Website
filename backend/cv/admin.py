from django.contrib import admin
from .models import *

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class SkillSubcategoryInline(admin.TabularInline):
    model = SkillSubcategory
    extra = 1

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    inlines = [SkillSubcategoryInline]

@admin.register(SkillSubcategory)
class SkillSubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name', 'category__name')
    inlines = [SkillInline]
    list_filter = ('category',)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('short_name', 'long_name', 'subcategory', 'get_category', 'type_key')
    search_fields = ('short_name', 'long_name', 'type_key')
    list_filter = ('subcategory__category',)

    def get_category(self, obj):
        return obj.subcategory.category.name
    get_category.short_description = 'Category'

class ReferenceEmailInline(admin.TabularInline):
    model = ReferenceEmail
    extra = 1

class ReferencePhoneInline(admin.TabularInline):
    model = ReferencePhone
    extra = 1

@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ('name', 'institution', 'position', 'location', 'url', 'type_key')
    inlines = [ReferenceEmailInline, ReferencePhoneInline]
    search_fields = ('name', 'institution', 'position', 'type_key')

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'status', 'correspondent', 'institution', 'isbn', 'submission_date', 'url', 'type_key')
    search_fields = ('title', 'authors', 'correspondent', 'institution', 'isbn', 'type_key')
    list_filter = ('type', 'status')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'institution', 'duration', 'primary_focus', 'description')
    search_fields = ('role', 'institution', 'primary_focus', 'description')

@admin.register(SoftSkill)
class SoftSkillAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'type_key')
    search_fields = ('title', 'description', 'type_key')

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class CertificationInline(admin.TabularInline):
    model = Certification
    extra = 1

@admin.register(CertificationIssuer)
class CertificationIssuerAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [CertificationInline]

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'date', 'duration', 'certificate', 'url', 'type_key')
    search_fields = ('name', 'issuer__name', 'type_key')
    list_filter = ('certificate', 'issuer')

@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    list_display = ('country_code', 'number', 'formatted')

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('city', 'country', 'postal_code')

@admin.register(BasicInfo)
class BasicInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'birth_date', 'profile_picture_url', 'cover_picture_url')
    search_fields = ('name', 'email')
    filter_horizontal = ('locations',)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('network', 'username', 'url')
    search_fields = ('network', 'username')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('institution', 'study_type', 'location', 'start_date', 'end_date', 'gpa')
    search_fields = ('institution', 'area', 'location')

class ProficiencyInline(admin.StackedInline):
    model = Proficiency
    extra = 0

class LanguageCertificationInline(admin.TabularInline):
    model = LanguageCertification
    extra = 1

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('language',)
    inlines = [ProficiencyInline, LanguageCertificationInline]

@admin.register(Proficiency)
class ProficiencyAdmin(admin.ModelAdmin):
    list_display = ('language', 'level', 'CEFR', 'status')

@admin.register(LanguageCertification)
class LanguageCertificationAdmin(admin.ModelAdmin):
    list_display = ('language', 'test', 'organization', 'overall', 'examDate', 'url')
    search_fields = ('language__language', 'test', 'organization', 'url')
