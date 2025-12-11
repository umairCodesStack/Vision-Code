from django.contrib import admin
from .models import CodingProblem, Submission, TestCaseResult


@admin.register(CodingProblem)
class CodingProblemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "content",
        "difficulty",
        "time_limit_minutes",
    )
    list_filter = ("difficulty",)
    search_fields = ("content__title",)


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "problem",
        "programming_language",
        "passed_all_tests",
        "score",
        "submitted_at",
    )
    list_filter = ("passed_all_tests", "programming_language")
    search_fields = ("user__email", "problem__content__title")


@admin.register(TestCaseResult)
class TestCaseResultAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "submission",
        "test_case_index",
        "passed",
        "execution_time",
    )
    list_filter = ("passed",)
    search_fields = ("submission__user__email",)
