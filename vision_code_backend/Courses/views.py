# courses/views.py
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Course
from .serializers import CourseListSerializer, CourseDetailSerializer
from Accounts.permissions import IsInstructorOrAdmin
from Enrollment_Learning.models import Enrollment
from Enrollment_Learning.serializers import EnrollmentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().select_related("instructor")
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["difficulty_level", "is_published"]
    search_fields = ["title", "topics"]
    ordering_fields = ["created_at", "price"]

    def get_serializer_class(self):
        if self.action in ("list",):
            return CourseListSerializer
        return CourseDetailSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [IsAuthenticated(), IsInstructorOrAdmin()]
        return [AllowAny()]

    def perform_create(self, serializer):
        # automatically set instructor as the authenticated user
        serializer.save(instructor=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        course = self.get_object()
        user = request.user
        enrollment, created = Enrollment.objects.get_or_create(user=user, course=course)
        serializer = EnrollmentSerializer(enrollment, context={"request": request})
        status_code = 201 if created else 200
        return Response(serializer.data, status=status_code)
