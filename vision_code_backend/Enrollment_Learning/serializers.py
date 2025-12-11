# learning/serializers.py
from rest_framework import serializers
from .models import Enrollment
from Courses.serializers import CourseListSerializer
from django.conf import settings

class EnrollmentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    course = CourseListSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ("id", "user", "course", "enrollment_status", "enrolled_at", "completed_at", "progress_percentage")
        read_only_fields = ("enrolled_at", "completed_at", "user")

    def get_user(self, obj):
        return {"id": obj.user.id, "email": obj.user.email}
