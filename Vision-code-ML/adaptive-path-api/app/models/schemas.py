"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Optional
from enum import Enum


class SkillLevel(str, Enum):
    """Student skill level enumeration"""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class Difficulty(str, Enum):
    """Module difficulty enumeration"""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class StudentProfile(BaseModel):
    """Student profile information"""
    skill_level: SkillLevel = Field(..., description="Current skill level of the student")
    learning_goal: str = Field(..., description="Student's learning objective", min_length=1)


class CurrentProgress(BaseModel):
    """Student's current progress in the course"""
    completed_modules: List[str] = Field(default=[], description="List of completed module IDs")
    quiz_scores: Dict[str, int] = Field(default={}, description="Quiz scores per module (0-100)")
    
    @validator('quiz_scores')
    def validate_scores(cls, v):
        """Validate quiz scores are between 0 and 100"""
        for module_id, score in v.items():
            if not 0 <= score <= 100:
                raise ValueError(f"Score for {module_id} must be between 0 and 100")
        return v


class PathRecommendationRequest(BaseModel):
    """Request model for path recommendation"""
    student_id: str = Field(..., description="Unique student identifier")
    course_id: str = Field(..., description="Course identifier")
    current_progress: CurrentProgress
    student_profile: StudentProfile
    
    class Config:
        json_schema_extra = {
            "example": {
                "student_id": "student_123",
                "course_id": "python_basics",
                "current_progress": {
                    "completed_modules": ["module_1", "module_2"],
                    "quiz_scores": {
                        "module_1": 85,
                        "module_2": 65
                    }
                },
                "student_profile": {
                    "skill_level": "beginner",
                    "learning_goal": "Learn Python for data science"
                }
            }
        }


class RecommendedModule(BaseModel):
    """Individual module recommendation"""
    module_id: str = Field(..., description="Module identifier")
    title: str = Field(..., description="Module title")
    difficulty: Difficulty = Field(..., description="Recommended difficulty level")
    estimated_time_minutes: int = Field(..., description="Estimated completion time")
    reason: str = Field(..., description="Why this module is recommended")
    prerequisites: List[str] = Field(default=[], description="Required prerequisite modules")


class PathRecommendationResponse(BaseModel):
    """Response model for path recommendation"""
    student_id: str
    course_id: str
    recommended_path: List[RecommendedModule]
    next_action: str = Field(..., description="Immediate next step for the student")
    overall_progress_percentage: float = Field(..., description="Course completion percentage")
    
    class Config:
        json_schema_extra = {
            "example": {
                "student_id": "student_123",
                "course_id": "python_basics",
                "recommended_path": [
                    {
                        "module_id": "module_3",
                        "title": "Control Flow and Loops",
                        "difficulty": "beginner",
                        "estimated_time_minutes": 45,
                        "reason": "Next sequential module after basics",
                        "prerequisites": ["module_1", "module_2"]
                    }
                ],
                "next_action": "Review module_2 (scored 65%) before proceeding to module_3",
                "overall_progress_percentage": 40.0
            }
        }


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    detail: Optional[str] = None