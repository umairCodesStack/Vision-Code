"""
API endpoint tests
"""
import pytest
from fastapi.testclient import TestClient
from main import app
from app.db.database import init_db


@pytest.fixture(scope="module")
def client():
    """Test client fixture"""
    init_db()
    with TestClient(app) as c:
        yield c


def test_health_check(client):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_root_endpoint(client):
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data


def test_list_courses(client):
    """Test listing all courses"""
    response = client.get("/api/v1/courses")
    assert response.status_code == 200
    data = response.json()
    assert "courses" in data
    assert "total_courses" in data
    assert data["total_courses"] > 0


def test_get_course_details(client):
    """Test getting specific course details"""
    response = client.get("/api/v1/courses/python_basics")
    assert response.status_code == 200
    data = response.json()
    assert data["course_id"] == "python_basics"
    assert "modules" in data
    assert len(data["modules"]) > 0


def test_get_course_not_found(client):
    """Test getting non-existent course"""
    response = client.get("/api/v1/courses/non_existent_course")
    assert response.status_code == 404


def test_get_module_details(client):
    """Test getting specific module details"""
    response = client.get("/api/v1/courses/python_basics/modules/module_1")
    assert response.status_code == 200
    data = response.json()
    assert data["module_id"] == "module_1"
    assert "title" in data
    assert "difficulty" in data


def test_recommend_path_beginner_no_progress(client):
    """Test recommendation for beginner with no progress"""
    request_data = {
        "student_id": "student_001",
        "course_id": "python_basics",
        "current_progress": {
            "completed_modules": [],
            "quiz_scores": {}
        },
        "student_profile": {
            "skill_level": "beginner",
            "learning_goal": "Learn Python basics"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 200
    data = response.json()
    
    assert data["student_id"] == "student_001"
    assert data["course_id"] == "python_basics"
    assert "recommended_path" in data
    assert len(data["recommended_path"]) > 0
    assert "next_action" in data
    assert data["overall_progress_percentage"] == 0.0


def test_recommend_path_with_progress(client):
    """Test recommendation with some completed modules"""
    request_data = {
        "student_id": "student_002",
        "course_id": "python_basics",
        "current_progress": {
            "completed_modules": ["module_1", "module_2"],
            "quiz_scores": {
                "module_1": 85,
                "module_2": 78
            }
        },
        "student_profile": {
            "skill_level": "beginner",
            "learning_goal": "Master Python fundamentals"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 200
    data = response.json()
    
    assert data["overall_progress_percentage"] == 20.0  # 2 out of 10 modules
    assert len(data["recommended_path"]) > 0
    
    # Should recommend module_3 as it's next in sequence
    module_ids = [m["module_id"] for m in data["recommended_path"]]
    assert "module_3" in module_ids


def test_recommend_path_with_low_score(client):
    """Test recommendation when student has low scores (needs review)"""
    request_data = {
        "student_id": "student_003",
        "course_id": "python_basics",
        "current_progress": {
            "completed_modules": ["module_1", "module_2"],
            "quiz_scores": {
                "module_1": 45,
                "module_2": 55
            }
        },
        "student_profile": {
            "skill_level": "beginner",
            "learning_goal": "Improve understanding"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 200
    data = response.json()
    
    # Should suggest review
    assert "review" in data["next_action"].lower() or "Review" in data["next_action"]
    
    # Check if review modules are in recommendations
    review_modules = [m for m in data["recommended_path"] if "[REVIEW]" in m["title"]]
    assert len(review_modules) > 0


def test_recommend_path_advanced_student(client):
    """Test recommendation for advanced student"""
    request_data = {
        "student_id": "student_004",
        "course_id": "python_basics",
        "current_progress": {
            "completed_modules": ["module_1", "module_2", "module_3"],
            "quiz_scores": {
                "module_1": 95,
                "module_2": 92,
                "module_3": 90
            }
        },
        "student_profile": {
            "skill_level": "advanced",
            "learning_goal": "Quick completion"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 200
    data = response.json()
    
    # Advanced student with good scores should get more challenging content
    assert len(data["recommended_path"]) > 0


def test_recommend_path_invalid_course(client):
    """Test recommendation with invalid course ID"""
    request_data = {
        "student_id": "student_005",
        "course_id": "invalid_course",
        "current_progress": {
            "completed_modules": [],
            "quiz_scores": {}
        },
        "student_profile": {
            "skill_level": "beginner",
            "learning_goal": "Learn"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 404


def test_recommend_path_invalid_module(client):
    """Test recommendation with invalid module in completed list"""
    request_data = {
        "student_id": "student_006",
        "course_id": "python_basics",
        "current_progress": {
            "completed_modules": ["invalid_module"],
            "quiz_scores": {}
        },
        "student_profile": {
            "skill_level": "beginner",
            "learning_goal": "Learn"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 400


def test_recommend_path_invalid_score(client):
    """Test recommendation with invalid quiz score"""
    request_data = {
        "student_id": "student_007",
        "course_id": "python_basics",
        "current_progress": {
            "completed_modules": ["module_1"],
            "quiz_scores": {
                "module_1": 150  # Invalid score > 100
            }
        },
        "student_profile": {
            "skill_level": "beginner",
            "learning_goal": "Learn"
        }
    }
    
    response = client.post("/api/v1/recommend/path", json=request_data)
    assert response.status_code == 422  # Validation error