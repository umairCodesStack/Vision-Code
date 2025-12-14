"""
API route handlers
"""
from fastapi import APIRouter, HTTPException, status
from typing import Dict, Any
import logging

from app.models.schemas import (
    PathRecommendationRequest,
    PathRecommendationResponse,
    ErrorResponse
)
from app.db.database import get_course, get_all_courses
from app.services.recommendation_engine import RecommendationEngine

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/recommend/path",
    response_model=PathRecommendationResponse,
    status_code=status.HTTP_200_OK,
    summary="Get personalized learning path recommendation",
    responses={
        404: {"model": ErrorResponse, "description": "Course not found"},
        400: {"model": ErrorResponse, "description": "Invalid request"}
    }
)
async def recommend_path(request: PathRecommendationRequest) -> PathRecommendationResponse:
    """
    Generate an adaptive learning path recommendation for a student
    
    This endpoint analyzes:
    - Student's current progress and quiz scores
    - Student's skill level and learning goals
    - Course structure and prerequisites
    
    Returns a personalized sequence of modules with difficulty adjustments
    """
    logger.info(f"Recommendation request for student: {request.student_id}, course: {request.course_id}")
    
    # Retrieve course
    course = get_course(request.course_id)
    if not course:
        logger.error(f"Course not found: {request.course_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course '{request.course_id}' not found"
        )
    
    # Validate completed modules exist in course
    valid_modules = {m.module_id for m in course.modules}
    invalid_modules = set(request.current_progress.completed_modules) - valid_modules
    if invalid_modules:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid module IDs: {invalid_modules}"
        )
    
    # Generate recommendations
    try:
        engine = RecommendationEngine(course)
        recommended_modules, next_action = engine.generate_recommendations(request)
        progress_percentage = engine.calculate_progress_percentage(
            request.current_progress.completed_modules
        )
        
        response = PathRecommendationResponse(
            student_id=request.student_id,
            course_id=request.course_id,
            recommended_path=recommended_modules,
            next_action=next_action,
            overall_progress_percentage=round(progress_percentage, 2)
        )
        
        logger.info(f"Generated {len(recommended_modules)} recommendations for student {request.student_id}")
        return response
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate recommendations"
        )


@router.get(
    "/courses",
    response_model=Dict[str, Any],
    summary="List all available courses"
)
async def list_courses():
    """
    Get a list of all available courses in the system
    """
    courses = get_all_courses()
    
    course_list = []
    for course_id, course in courses.items():
        course_list.append({
            "course_id": course.course_id,
            "title": course.title,
            "description": course.description,
            "total_modules": course.total_modules,
            "module_count": len(course.modules)
        })
    
    return {
        "total_courses": len(course_list),
        "courses": course_list
    }


@router.get(
    "/courses/{course_id}",
    response_model=Dict[str, Any],
    summary="Get detailed course information",
    responses={
        404: {"model": ErrorResponse, "description": "Course not found"}
    }
)
async def get_course_details(course_id: str):
    """
    Get detailed information about a specific course including all modules
    """
    course = get_course(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course '{course_id}' not found"
        )
    
    return {
        "course_id": course.course_id,
        "title": course.title,
        "description": course.description,
        "total_modules": course.total_modules,
        "modules": [
            {
                "module_id": m.module_id,
                "title": m.title,
                "difficulty": m.difficulty,
                "estimated_time_minutes": m.estimated_time_minutes,
                "prerequisites": m.prerequisites,
                "topics": m.topics,
                "order": m.order
            }
            for m in course.modules
        ]
    }


@router.get(
    "/courses/{course_id}/modules/{module_id}",
    response_model=Dict[str, Any],
    summary="Get specific module details",
    responses={
        404: {"model": ErrorResponse, "description": "Course or module not found"}
    }
)
async def get_module_details(course_id: str, module_id: str):
    """
    Get detailed information about a specific module in a course
    """
    course = get_course(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course '{course_id}' not found"
        )
    
    module = course.get_module(module_id)
    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Module '{module_id}' not found in course '{course_id}'"
        )
    
    return {
        "module_id": module.module_id,
        "title": module.title,
        "difficulty": module.difficulty,
        "estimated_time_minutes": module.estimated_time_minutes,
        "prerequisites": module.prerequisites,
        "topics": module.topics,
        "order": module.order
    }