# Courses/urls.py
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CourseModuleViewSet, ContentItemViewSet

router = DefaultRouter()
router.register(r"courses", CourseViewSet, basename="course")
router.register(r"course-modules", CourseModuleViewSet, basename="course-modules")
router.register(r"content-items", ContentItemViewSet, basename="content-items")

urlpatterns = router.urls
