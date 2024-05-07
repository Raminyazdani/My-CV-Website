from django.contrib import admin

# import models
from .models_items import Contacts
from .models_items import Courses
from .models_items import Educations
from .models_items import Files
from .models_items import Infos
from .models_items import LanguageItems
from .models_items import Languages
from .models_items import Literatures
from .models_items import ProfilePictures
from .models_items import ProjectItems
from .models_items import Projects
from .models_items import ReferenceContacts
from .models_items import References
from .models_items import SkillsItems
from .models_items import Skills
from .models_items import Supplementary
from .models_items import Users
from .models_items import WorkContacts
from .models_items import Works
from .models_items import WriterContacts
from .models_items import Writers

# Register your models here.

admin.site.register(Contacts)
admin.site.register(Courses)
admin.site.register(Educations)
admin.site.register(Files)
admin.site.register(Infos)
admin.site.register(LanguageItems)
admin.site.register(Languages)
admin.site.register(Literatures)
admin.site.register(ProfilePictures)
admin.site.register(ProjectItems)
admin.site.register(Projects)
admin.site.register(ReferenceContacts)
admin.site.register(References)
admin.site.register(SkillsItems)
admin.site.register(Skills)
admin.site.register(Supplementary)
admin.site.register(Users)
admin.site.register(WorkContacts)
admin.site.register(Works)
admin.site.register(WriterContacts)
admin.site.register(Writers)
