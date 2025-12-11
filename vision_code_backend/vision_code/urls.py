from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Accounts.views import UserViewSet, SignupView
from Courses.views import CourseViewSet
from Enrollment_Learning.views import EnrollmentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r"Users", UserViewSet, basename="user")
router.register(r"Courses", CourseViewSet, basename="course")
router.register(r"Enrollment_Learning", EnrollmentViewSet, basename="enrollment")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/signup/", SignupView.as_view(), name="signup"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include(router.urls)),
]
