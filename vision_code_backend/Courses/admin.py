from django.contrib import admin
from .models import Course, CourseModule, ContentItem, ContentVariation

admin.site.register(Course)
admin.site.register(CourseModule)
admin.site.register(ContentItem)
admin.site.register(ContentVariation)
