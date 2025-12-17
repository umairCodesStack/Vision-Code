'''# courses/serializers.py
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
'''
# Courses/serializers.py
from rest_framework import serializers
from .models import Course, CourseModule, ContentItem


# -----------------------------
# Nested Read-Only Serializers
# -----------------------------
class ContentItemNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentItem
        fields = (
            "id",
            "title",
            "content_type",
            "metadata",
            "estimated_duration_minutes",
            "difficulty",
        )


class CourseModuleNestedSerializer(serializers.ModelSerializer):
    content_items = ContentItemNestedSerializer(many=True, read_only=True)

    class Meta:
        model = CourseModule
        fields = (
            "id",
            "title",
            "module_order",
            "learning_objectives",
            "content_items",
        )


class CourseListSerializer(serializers.ModelSerializer):
    instructor = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "difficulty_level",
            "topics",
            "is_published",
            "price",
            "instructor",
        )

    def get_instructor(self, obj):
        return {"id": obj.instructor.id, "email": obj.instructor.email}


class CourseDetailSerializer(serializers.ModelSerializer):
    instructor = serializers.SerializerMethodField()
    modules = CourseModuleNestedSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "difficulty_level",
            "topics",
            "is_published",
            "price",
            "instructor",
            "modules",
        )

    def get_instructor(self, obj):
        return {"id": obj.instructor.id, "email": obj.instructor.email}


# -----------------------------
# Write Serializers
# -----------------------------
class CourseModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseModule
        fields = (
            "id",
            "course",
            "title",
            "description",
            "module_order",
            "learning_objectives",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_module_order(self, value):
        if value <= 0:
            raise serializers.ValidationError("module_order must be positive.")
        return value


class ContentItemSerializer(serializers.ModelSerializer):
    # NO video logic (as requested)
    class Meta:
        model = ContentItem
        fields = (
            "id",
            "module",
            "content_type",
            "title",
            "content",
            "metadata",
            "estimated_duration_minutes",
            "difficulty",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def validate(self, attrs):
        # duration validation
        duration = attrs.get("estimated_duration_minutes")
        if duration is not None and duration < 0:
            raise serializers.ValidationError({"estimated_duration_minutes": "must be >= 0"})
        return attrs
