# courses/serializers.py
from rest_framework import serializers
from .models import Course, CourseModule, ContentItem

class ContentItemNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentItem
        fields = ("id", "title", "content_type", "metadata", "estimated_duration_minutes", "difficulty")


class CourseModuleNestedSerializer(serializers.ModelSerializer):
    content_items = ContentItemNestedSerializer(many=True, read_only=True)

    class Meta:
        model = CourseModule
        fields = ("id", "title", "module_order", "content_items")


class CourseListSerializer(serializers.ModelSerializer):
    instructor = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ("id", "title", "difficulty_level", "topics", "is_published", "price", "instructor")

    def get_instructor(self, obj):
        return {"id": obj.instructor.id, "email": obj.instructor.email}


class CourseDetailSerializer(serializers.ModelSerializer):
    instructor = serializers.SerializerMethodField()
    modules = CourseModuleNestedSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ("id", "title", "description", "difficulty_level", "topics", "is_published", "price", "instructor", "modules")

    def get_instructor(self, obj):
        return {"id": obj.instructor.id, "email": obj.instructor.email}
