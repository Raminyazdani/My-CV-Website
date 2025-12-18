from django.core.serializers import serialize
from django.db import models


class UserDataManager(models.Manager):
    def get_fields(self, obj):
        all_fields = obj._meta.get_fields()
        fields = []
        forw_fields = []
        rev_fields = []
        for field in all_fields:
            if field.is_relation and not field.auto_created:
                forw_fields.append(field.name)
            elif field.auto_created and not field.concrete:
                rev_fields.append(field.name)
            else:
                fields.append(field.name)
        data = {}
        data['fields'] = fields
        data['forw_fields'] = forw_fields
        data['rev_fields'] = rev_fields
        return data

    def add_fields(self, obj, exclude=[]):
        exclude += ['id']
        fields = self.get_fields(obj)
        temp = {}
        for key in fields['fields']:
            if key in exclude:
                continue
            temp[key] = getattr(obj, key)
        return temp

    # def get_recursively_related_objects(self, obj, data=None,  visited=None):
    #     if data is None:
    #         data = {}
    #     if visited is None:
    #         visited = set()
    #
    #     if obj in visited:  # Avoid revisiting the same object
    #         return data
    #     visited.add(obj)
    #
    #     # Determine fields
    #     all_fields = obj._meta.get_fields()
    #
    #     for field in all_fields:
    #         # Determine if it is a forward relation (ForeignKey, OneToOneField)
    #         if field.is_relation and not field.auto_created:
    #
    #             value = getattr(obj, field.name)
    #             if field.many_to_one or field.one_to_one:
    #                 if value is not None:
    #                     data[field.name] = self.get_recursively_related_objects(value, {}, visited)
    #             elif field.many_to_many or field.one_to_many:
    #                 related_objects = value.all()
    #                 data[field.name] = [self.get_recursively_related_objects(item, {},visited) for item in related_objects]
    #
    #         # Reverse relation
    #         elif field.auto_created and not field.concrete:
    #             related_objects = getattr(obj, field.get_accessor_name()).all()
    #             data[field.name] = [self.get_recursively_related_objects(item, {},visited) for item in related_objects]
    #
    #         # Normal fields
    #         else:
    #             if field.concrete and not field.is_relation:
    #                 data[field.name] = getattr(obj, field.name)
    #
    #     return data
    def set_file_if_exists(self, obj, field_name):
        if hasattr(obj, field_name):
            file = getattr(obj, field_name)
            if file:
                return file.file.file
        return None

    def get_complete_user_data(self, user_id):
        # Fetch the user with related data
        user = self.get(id=user_id)
        # return self.get_recursively_related_objects(user)
        data = {}
        data["id"] = user.id
        data["first_name"] = user.first_name
        data["last_name"] = user.last_name
        data["date_of_birth"] = user.date_of_birth
        data["languages"] = []
        data["profile_pictures"] = None
        if user.profile_pictures.first():
            data["profile_pictures"] = user.profile_pictures.first().file.file.file

        for language in user.languages.all():
            temp_d = self.add_fields(language)
            temp_d["file"] = self.set_file_if_exists(language, 'exam_file')
            childs = language.datas.all()
            for child in childs:
                if "datas" not in temp_d.keys():
                    temp_d["datas"] = []
                temp_d["datas"].append({child.key:child.value})
            data["languages"].append(temp_d)
        data["supplementary"]=[]
        for supp in user.supplementary.all():
            temp_d = self.add_fields(supp)
            temp_d["file"] = self.set_file_if_exists(supp, 'file')
            data["supplementary"].append(temp_d)
        data["contacts"] =[]
        for contact in user.contacts.all():
            temp_d = self.add_fields(contact)
            data["contacts"].append(temp_d)
        data["educations"] = []
        for education in user.educations.all():
            temp_d = self.add_fields(education)
            temp_d["transcript_file"] = self.set_file_if_exists(education, 'transcript_file')
            temp_d["degree_file"] = self.set_file_if_exists(education, 'degree_file')
            data["educations"].append(temp_d)
        data["infos"] = {}
        for info in user.infos.all():
            temp_d = self.add_fields(info)
            data["infos"][info.type] = temp_d
            data["infos"][info.type]["courses"] = []
            for course in info.courses.all():
                temp_d = self.add_fields(course)
                temp_d["exam_file"] = self.set_file_if_exists(course, 'exam_file')
                temp_d["certificate_file"] = self.set_file_if_exists(course, 'certificate_file')
                data["infos"][info.type]["courses"].append(temp_d)

            data["infos"][info.type]["skills"] = []
            for skill in info.skills.all():
                temp_d = self.add_fields(skill)
                temp_d["items"] = []
                for child in skill.items.all():
                    temp_d["items"].append(self.add_fields(child))
                data["infos"][info.type]["skills"].append(temp_d)

            data["infos"][info.type]["references"] = []
            for reference in info.references.all():
                temp_d = self.add_fields(reference)
                temp_d["file"] = self.set_file_if_exists(reference, 'reference_file')
                temp_d["contacts"] = []
                for child in reference.contacts.all():
                    temp_d["contacts"].append(self.add_fields(child))
                data["infos"][info.type]["references"].append(temp_d)

            data["infos"][info.type]["works"] = []
            for work in info.works.all():
                temp_d = self.add_fields(work)
                temp_d["file"] = self.set_file_if_exists(work, 'proof_file')
                temp_d["contacts"] = []
                for child in work.contacts.all():
                    temp_d["contacts"].append(self.add_fields(child))
                data["infos"][info.type]["works"].append(temp_d)

            data["infos"][info.type]["projects"] = []
            for proj in info.projects.all():
                temp_d = self.add_fields(proj)
                temp_d["file"] = self.set_file_if_exists(proj, 'project_file')
                data["infos"][info.type]["projects"].append(temp_d)


            data["infos"][info.type]["literatures"] = []
            for lit in info.literatures.all():
                temp_d = self.add_fields(lit)
                temp_d["file"] = self.set_file_if_exists(lit, 'file')
                temp_d["writers"] = []
                for writer in lit.writers.all():
                    temp_d_d = []
                    temp_d_d.append(self.add_fields(writer))
                    for child in writer.contacts.all():
                        temp_d_d.append(self.add_fields(child))
                    temp_d["writers"].append(temp_d_d)
                data["infos"][info.type]["literatures"].append(temp_d)

        # data["educations"] = self.add_fields(user.educations.all(), ['transcript_file.file', 'degree_file.file'])
        final_data = {}
        for key, value in data.items():
            if type(value) not in [list, dict]:
                final_data[key] = [value]
            else:
                final_data[key] = value
        print(*final_data.items(), sep='\n')
        print("\n\n")
        for types , key_val in final_data["infos"].items():
            print(types)
            for key,value in key_val.items():
                print("\t",key,value)
        return final_data
