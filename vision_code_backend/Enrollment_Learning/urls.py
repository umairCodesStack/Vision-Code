# Enrollment_Learning/urls.py
from rest_framework.routers import DefaultRouter
from .views import EnrollmentViewSet, UserProgressViewSet, LearningPathViewSet

router = DefaultRouter()
router.register(r"enrollments", EnrollmentViewSet, basename="enrollment")
router.register(r"progress", UserProgressViewSet, basename="user-progress")
router.register(r"learning-paths", LearningPathViewSet, basename="learning-path")

urlpatterns = router.urls
