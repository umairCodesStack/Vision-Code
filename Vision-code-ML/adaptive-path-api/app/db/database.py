"""
Mock database for demonstration purposes
In production, replace with actual database (PostgreSQL, MongoDB, etc.)
"""
from typing import Dict, Optional
from app.models.course import Course, Module
import logging

logger = logging.getLogger(__name__)

# In-memory storage
COURSES_DB: Dict[str, Course] = {}


def init_db():
    """Initialize database with sample data"""
    logger.info("Initializing mock database...")
    
    # Sample course: Python Basics
    python_basics = Course(
        course_id="python_basics",
        title="Python Programming Basics",
        description="Learn Python from scratch",
        total_modules=10,
        modules=[
            Module(
                module_id="module_1",
                title="Introduction to Python",
                difficulty="beginner",
                estimated_time_minutes=30,
                prerequisites=[],
                topics=["syntax", "variables", "data types"],
                order=1
            ),
            Module(
                module_id="module_2",
                title="Basic Operations and Strings",
                difficulty="beginner",
                estimated_time_minutes=40,
                prerequisites=["module_1"],
                topics=["operators", "strings", "input/output"],
                order=2
            ),
            Module(
                module_id="module_3",
                title="Control Flow and Loops",
                difficulty="beginner",
                estimated_time_minutes=45,
                prerequisites=["module_1", "module_2"],
                topics=["if statements", "for loops", "while loops"],
                order=3
            ),
            Module(
                module_id="module_4",
                title="Functions and Scope",
                difficulty="intermediate",
                estimated_time_minutes=50,
                prerequisites=["module_3"],
                topics=["functions", "parameters", "scope", "recursion"],
                order=4
            ),
            Module(
                module_id="module_5",
                title="Data Structures - Lists and Tuples",
                difficulty="intermediate",
                estimated_time_minutes=55,
                prerequisites=["module_3"],
                topics=["lists", "tuples", "list comprehension"],
                order=5
            ),
            Module(
                module_id="module_6",
                title="Data Structures - Dictionaries and Sets",
                difficulty="intermediate",
                estimated_time_minutes=50,
                prerequisites=["module_5"],
                topics=["dictionaries", "sets", "hash tables"],
                order=6
            ),
            Module(
                module_id="module_7",
                title="File Handling",
                difficulty="intermediate",
                estimated_time_minutes=45,
                prerequisites=["module_4", "module_6"],
                topics=["file operations", "context managers", "JSON"],
                order=7
            ),
            Module(
                module_id="module_8",
                title="Object-Oriented Programming",
                difficulty="advanced",
                estimated_time_minutes=60,
                prerequisites=["module_4"],
                topics=["classes", "objects", "inheritance", "polymorphism"],
                order=8
            ),
            Module(
                module_id="module_9",
                title="Error Handling and Exceptions",
                difficulty="advanced",
                estimated_time_minutes=40,
                prerequisites=["module_4"],
                topics=["exceptions", "try-except", "custom exceptions"],
                order=9
            ),
            Module(
                module_id="module_10",
                title="Modules and Packages",
                difficulty="advanced",
                estimated_time_minutes=45,
                prerequisites=["module_8"],
                topics=["imports", "packages", "pip", "virtual environments"],
                order=10
            ),
        ]
    )
    
    COURSES_DB["python_basics"] = python_basics
    
    # Add more sample courses here
    data_science = Course(
        course_id="data_science_101",
        title="Data Science Fundamentals",
        description="Introduction to Data Science with Python",
        total_modules=8,
        modules=[
            Module(
                module_id="ds_module_1",
                title="Introduction to Data Science",
                difficulty="beginner",
                estimated_time_minutes=35,
                prerequisites=[],
                topics=["data science overview", "applications"],
                order=1
            ),
            Module(
                module_id="ds_module_2",
                title="NumPy Fundamentals",
                difficulty="intermediate",
                estimated_time_minutes=50,
                prerequisites=["ds_module_1"],
                topics=["arrays", "operations", "broadcasting"],
                order=2
            ),
            Module(
                module_id="ds_module_3",
                title="Pandas for Data Analysis",
                difficulty="intermediate",
                estimated_time_minutes=60,
                prerequisites=["ds_module_2"],
                topics=["dataframes", "data manipulation", "aggregation"],
                order=3
            ),
            Module(
                module_id="ds_module_4",
                title="Data Visualization with Matplotlib",
                difficulty="intermediate",
                estimated_time_minutes=45,
                prerequisites=["ds_module_3"],
                topics=["plotting", "charts", "customization"],
                order=4
            ),
            Module(
                module_id="ds_module_5",
                title="Statistical Analysis",
                difficulty="advanced",
                estimated_time_minutes=55,
                prerequisites=["ds_module_3"],
                topics=["statistics", "probability", "hypothesis testing"],
                order=5
            ),
            Module(
                module_id="ds_module_6",
                title="Introduction to Machine Learning",
                difficulty="advanced",
                estimated_time_minutes=60,
                prerequisites=["ds_module_5"],
                topics=["ML concepts", "supervised learning", "unsupervised learning"],
                order=6
            ),
            Module(
                module_id="ds_module_7",
                title="Linear Regression",
                difficulty="advanced",
                estimated_time_minutes=50,
                prerequisites=["ds_module_6"],
                topics=["regression", "model training", "evaluation"],
                order=7
            ),
            Module(
                module_id="ds_module_8",
                title="Classification Algorithms",
                difficulty="advanced",
                estimated_time_minutes=55,
                prerequisites=["ds_module_6"],
                topics=["classification", "decision trees", "logistic regression"],
                order=8
            ),
        ]
    )
    
    COURSES_DB["data_science_101"] = data_science
    
    logger.info(f"Loaded {len(COURSES_DB)} courses into database")


def get_course(course_id: str) -> Optional[Course]:
    """Retrieve a course by ID"""
    return COURSES_DB.get(course_id)


def get_all_courses() -> Dict[str, Course]:
    """Get all available courses"""
    return COURSES_DB