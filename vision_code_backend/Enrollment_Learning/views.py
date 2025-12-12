# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from .models import Enrollment
# from .serializers import EnrollmentSerializer

# class EnrollmentViewSet(viewsets.ModelViewSet):
#     queryset = Enrollment.objects.all().select_related("user", "course")
#     serializer_class = EnrollmentSerializer

#     def get_queryset(self):
#         # users should only see their enrollments unless staff
#         user = self.request.user
#         if user.is_staff:
#             return super().get_queryset()
#         return Enrollment.objects.filter(user=user)

#     def perform_create(self, serializer):
#         # ensure user is current user
#         serializer.save(user=self.request.user)
# Enrollment_Learning/views.py  (or learning/views.py depending on your file)
'''from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Enrollment
from .serializers import EnrollmentSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    """
    Enrollment endpoints — only authenticated users can access.
    Staff users can see all enrollments; normal users only their own.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        user = self.request.user
        # defensive: if not authenticated, return empty queryset (but IsAuthenticated prevents this)
        if not user or not user.is_authenticated:
            return Enrollment.objects.none()

        if user.is_staff:
            return Enrollment.objects.all().select_related("user", "course")

        return Enrollment.objects.filter(user=user).select_related("user", "course")

    def perform_create(self, serializer):
        # save enrollment tied to current authenticated user
        serializer.save(user=self.request.user)
'''
# Enrollment_Learning/views.py
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Enrollment, UserProgress, LearningPath
from .serializers import (
    EnrollmentSerializer,
    UserProgressSerializer,
    LearningPathSerializer,
)
from django.utils import timezone


# ---------------------------------------------------------
# ENROLLMENT VIEWSET
# ---------------------------------------------------------
class EnrollmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Enrollment.objects.all().select_related("user", "course")
        return Enrollment.objects.filter(user=user).select_related("user", "course")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------------------------------------------------
# USER PROGRESS VIEWSET
# ---------------------------------------------------------
class UserProgressViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProgressSerializer

    def get_queryset(self):
        user = self.request.user
        return (
            UserProgress.objects.filter(user=user)
            .select_related("user", "content", "content__module")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


# ---------------------------------------------------------
# LEARNING PATH VIEWSET (minimal API)
# ---------------------------------------------------------
class LearningPathViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LearningPathSerializer

    def get_queryset(self):
        user = self.request.user
        return LearningPath.objects.filter(user=user).select_related(
            "user", "course", "ai_model"
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
