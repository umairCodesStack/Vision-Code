# main/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# ViewSets
from Accounts.views import UserViewSet, SignupView, UserMeView
from Courses.views import CourseViewSet
from Enrollment_Learning.views import EnrollmentViewSet

# JWT
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# ----------------------------------------
# DRF ROUTER REGISTRATION
# ----------------------------------------
router = DefaultRouter()

# IMPORTANT: keep endpoint names lowercase & REST style
router.register(r"users", UserViewSet, basename="user")
router.register(r"courses", CourseViewSet, basename="course")
router.register(r"enrollments", EnrollmentViewSet, basename="enrollment")


# ----------------------------------------
# URL PATTERNS
# ----------------------------------------
urlpatterns = [

    # Django Admin
    path("admin/", admin.site.urls),

    # Auth / Accounts
    path("api/auth/signup/", SignupView.as_view(), name="signup"),
    path("api/auth/me/", UserMeView.as_view(), name="user-me"),

    # JWT Auth
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Router endpoints
    path("api/", include(router.urls)),

    # Include app-specific URLs if needed later (AI, assessments, etc.)
    # path("api/accounts/", include("Accounts.urls")),
    # path("api/courses/", include("Courses.urls")),
    # path("api/learning/", include("Enrollment_Learning.urls")),
]
