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
from rest_framework import viewsets
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
