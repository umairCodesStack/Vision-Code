from django.urls import path   # ✅ correct import
from rest_framework.routers import DefaultRouter

from .views import (
    EnrollmentViewSet,
    MyCoursesView,
    UserProgressViewSet,
    LearningPathViewSet,
)

router = DefaultRouter()
router.register(r"enrollments", EnrollmentViewSet, basename="enrollment")
router.register(r"progress", UserProgressViewSet, basename="user-progress")
router.register(r"learning-paths", LearningPathViewSet, basename="learning-path")

# ✅ THIS IS IMPORTANT
urlpatterns = [
    path("my-courses/", MyCoursesView.as_view(), name="my-courses"),
]

# ✅ include router urls
urlpatterns += router.urls