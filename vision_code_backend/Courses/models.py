from django.db import models
from Accounts.models import User
from django.conf import settings
class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ('dsa_editorial', 'DSA Editorial'),
        ('instructor_published', 'Instructor Published'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=200)
    description = models.TextField()
    course_type = models.CharField(max_length=20, choices=COURSE_TYPE_CHOICES)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    topics = models.JSONField(default=list)
    is_published = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'courses'

class CourseModule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    module_order = models.IntegerField(default=0)
    learning_objectives = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'course_modules'

class ContentItem(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('article', 'Article'),
        ('coding_problem', 'Coding Problem'),
        ('quiz', 'Quiz'),
    ]
    
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    module = models.ForeignKey(CourseModule, on_delete=models.CASCADE, related_name='content_items')
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    content = models.TextField()
    metadata = models.JSONField(default=dict)
    estimated_duration_minutes = models.IntegerField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'content_items'

class ContentVariation(models.Model):
    VARIATION_TYPE_CHOICES = [
        ('simplified', 'Simplified'),
        ('standard', 'Standard'),
        ('advanced', 'Advanced'),
    ]
    
    content = models.ForeignKey(ContentItem, on_delete=models.CASCADE, related_name='variations')
    variation_type = models.CharField(max_length=20, choices=VARIATION_TYPE_CHOICES)
    adapted_content = models.TextField()
    ai_model = models.ForeignKey('AI_CV_models.AIModel', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'content_variations'