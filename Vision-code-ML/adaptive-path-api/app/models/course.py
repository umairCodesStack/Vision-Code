"""
Course and Module data models
"""
from typing import List, Optional
from pydantic import BaseModel, Field


class Module(BaseModel):
    """Course module model"""
    module_id: str
    title: str
    difficulty: str  # beginner, intermediate, advanced
    estimated_time_minutes: int
    prerequisites: List[str] = Field(default=[])
    topics: List[str] = Field(default=[])
    order: int  # Sequential order in the course


class Course(BaseModel):
    """Course model"""
    course_id: str
    title: str
    description: str
    modules: List[Module]
    total_modules: int
    
    def get_module(self, module_id: str) -> Optional[Module]:
        """Get a specific module by ID"""
        for module in self.modules:
            if module.module_id == module_id:
                return module
        return None
    
    def get_modules_by_difficulty(self, difficulty: str) -> List[Module]:
        """Get modules filtered by difficulty"""
        return [m for m in self.modules if m.difficulty == difficulty]
    
    def get_next_module(self, current_module_id: str) -> Optional[Module]:
        """Get the next module in sequence"""
        current = self.get_module(current_module_id)
        if not current:
            return None
        
        for module in self.modules:
            if module.order == current.order + 1:
                return module
        return None