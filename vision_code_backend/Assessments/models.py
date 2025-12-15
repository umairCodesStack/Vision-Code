from django.db import models
from Courses.models import ContentItem
from django.conf import settings

class CodingProblem(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    content = models.OneToOneField(ContentItem, on_delete=models.CASCADE, related_name='coding_problem')
    problem_statement = models.TextField()
    starter_code = models.JSONField(default=dict)
    test_cases = models.JSONField(default=list)
    hints = models.JSONField(default=list)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    time_limit_minutes = models.IntegerField()
    
    class Meta:
        db_table = 'coding_problems'

class Submission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submissions')
    problem = models.ForeignKey(CodingProblem, on_delete=models.CASCADE, related_name='submissions')
    submitted_code = models.TextField()
    programming_language = models.CharField(max_length=50)
    execution_results = models.JSONField(default=dict)
    passed_all_tests = models.BooleanField(default=False)
    score = models.FloatField(default=0.0)
    submitted_at = models.DateTimeField(auto_now_add=True)
    plagiarism_report = models.JSONField(default=dict)
    
    class Meta:
        db_table = 'submissions'

class TestCaseResult(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, related_name='test_case_results')
    test_case_index = models.IntegerField()
    passed = models.BooleanField(default=False)
    output = models.TextField()
    execution_time = models.FloatField(default=0.0)
    error_message = models.TextField()
    
    class Meta:
        db_table = 'test_case_results'