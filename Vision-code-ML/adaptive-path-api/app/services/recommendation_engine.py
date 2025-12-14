"""
Recommendation engine - Core business logic for path adaptation
"""
from typing import List, Dict, Set
from app.models.schemas import (
    PathRecommendationRequest,
    RecommendedModule,
    SkillLevel,
    Difficulty
)
from app.models.course import Course, Module
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class RecommendationEngine:
    """Rule-based recommendation engine for adaptive learning paths"""
    
    def __init__(self, course: Course):
        self.course = course
        self.min_pass_score = settings.MIN_PASS_SCORE
        self.mastery_threshold = settings.MASTERY_THRESHOLD
        self.review_threshold = settings.REVIEW_THRESHOLD
    
    def generate_recommendations(
        self,
        request: PathRecommendationRequest
    ) -> tuple[List[RecommendedModule], str]:
        """
        Generate personalized learning path recommendations
        
        Returns:
            Tuple of (recommended_modules, next_action)
        """
        completed = set(request.current_progress.completed_modules)
        scores = request.current_progress.quiz_scores
        skill_level = request.student_profile.skill_level
        
        # Step 1: Identify modules needing review
        review_modules = self._identify_review_modules(scores, completed)
        
        # Step 2: Get next available modules
        available_modules = self._get_available_modules(completed)
        
        # Step 3: Adjust difficulty based on performance and skill level
        adjusted_modules = self._adjust_difficulty(
            available_modules,
            scores,
            skill_level
        )
        
        # Step 4: Sort and prioritize modules
        prioritized_modules = self._prioritize_modules(
            adjusted_modules,
            review_modules,
            scores,
            skill_level
        )
        
        # Step 5: Generate next action recommendation
        next_action = self._generate_next_action(
            review_modules,
            prioritized_modules,
            scores,
            completed
        )
        
        # Step 6: Convert to response format
        recommended_modules = self._format_recommendations(
            prioritized_modules,
            review_modules,
            scores
        )
        
        return recommended_modules, next_action
    
    def _identify_review_modules(
        self,
        scores: Dict[str, int],
        completed: Set[str]
    ) -> List[Module]:
        """Identify modules that need review based on low scores"""
        review_modules = []
        
        for module_id, score in scores.items():
            if score < self.review_threshold and module_id in completed:
                module = self.course.get_module(module_id)
                if module:
                    review_modules.append(module)
                    logger.info(f"Module {module_id} flagged for review (score: {score})")
        
        return review_modules
    
    def _get_available_modules(self, completed: Set[str]) -> List[Module]:
        """Get modules that are available based on completed prerequisites"""
        available = []
        
        for module in self.course.modules:
            # Skip already completed modules
            if module.module_id in completed:
                continue
            
            # Check if all prerequisites are met
            prerequisites_met = all(
                prereq in completed for prereq in module.prerequisites
            )
            
            if prerequisites_met:
                available.append(module)
        
        return available
    
    def _adjust_difficulty(
        self,
        modules: List[Module],
        scores: Dict[str, int],
        skill_level: SkillLevel
    ) -> List[tuple[Module, Difficulty]]:
        """Adjust module difficulty based on student performance and skill level"""
        adjusted = []
        avg_score = self._calculate_average_score(scores)
        
        for module in modules:
            # Determine recommended difficulty
            if skill_level == SkillLevel.BEGINNER:
                if avg_score >= self.mastery_threshold:
                    # Strong beginner can handle intermediate
                    recommended_diff = Difficulty.INTERMEDIATE if module.difficulty != "beginner" else Difficulty.BEGINNER
                else:
                    # Stick to beginner level
                    recommended_diff = Difficulty.BEGINNER
            
            elif skill_level == SkillLevel.INTERMEDIATE:
                if avg_score >= self.mastery_threshold:
                    recommended_diff = Difficulty.ADVANCED if module.difficulty == "advanced" else Difficulty.INTERMEDIATE
                elif avg_score < self.min_pass_score:
                    # Struggling intermediate needs easier content
                    recommended_diff = Difficulty.BEGINNER if module.difficulty == "beginner" else Difficulty.INTERMEDIATE
                else:
                    recommended_diff = Difficulty.INTERMEDIATE
            
            else:  # Advanced
                if avg_score >= self.mastery_threshold:
                    recommended_diff = Difficulty.ADVANCED
                else:
                    # Advanced student struggling needs intermediate review
                    recommended_diff = Difficulty.INTERMEDIATE if module.difficulty != "advanced" else Difficulty.ADVANCED
            
            adjusted.append((module, recommended_diff))
        
        return adjusted
    
    def _prioritize_modules(
        self,
        modules: List[tuple[Module, Difficulty]],
        review_modules: List[Module],
        scores: Dict[str, int],
        skill_level: SkillLevel
    ) -> List[tuple[Module, Difficulty, int]]:
        """
        Prioritize modules with a priority score
        Higher priority = should be taken sooner
        """
        prioritized = []
        
        for module, difficulty in modules:
            priority = 100  # Base priority
            
            # Rule 1: Sequential order matters
            priority += (100 - module.order)
            
            # Rule 2: Matching difficulty gets bonus
            if (skill_level == SkillLevel.BEGINNER and difficulty == Difficulty.BEGINNER) or \
               (skill_level == SkillLevel.INTERMEDIATE and difficulty == Difficulty.INTERMEDIATE) or \
               (skill_level == SkillLevel.ADVANCED and difficulty == Difficulty.ADVANCED):
                priority += 20
            
            # Rule 3: Shorter modules get slight preference for quick wins
            if module.estimated_time_minutes <= 40:
                priority += 5
            
            # Rule 4: If prerequisites had low scores, lower priority
            prereq_scores = [scores.get(p, 100) for p in module.prerequisites]
            if prereq_scores and min(prereq_scores) < self.min_pass_score:
                priority -= 30
            
            prioritized.append((module, difficulty, priority))
        
        # Sort by priority (descending)
        prioritized.sort(key=lambda x: x[2], reverse=True)
        
        return prioritized
    
    def _generate_next_action(
        self,
        review_modules: List[Module],
        prioritized_modules: List[tuple[Module, Difficulty, int]],
        scores: Dict[str, int],
        completed: Set[str]
    ) -> str:
        """Generate immediate next action recommendation"""
        
        # Priority 1: Review weak modules
        if review_modules:
            worst_module = min(review_modules, key=lambda m: scores.get(m.module_id, 0))
            score = scores.get(worst_module.module_id, 0)
            return f"Review {worst_module.module_id}: '{worst_module.title}' (scored {score}%) before proceeding"
        
        # Priority 2: Complete the next recommended module
        if prioritized_modules:
            next_module = prioritized_modules[0][0]
            return f"Begin {next_module.module_id}: '{next_module.title}' - this is your next optimal learning step"
        
        # Priority 3: Course completion
        if len(completed) == self.course.total_modules:
            return "Congratulations! You have completed all modules in this course"
        
        return "Continue with available modules to progress in the course"
    
    def _format_recommendations(
        self,
        prioritized_modules: List[tuple[Module, Difficulty, int]],
        review_modules: List[Module],
        scores: Dict[str, int]
    ) -> List[RecommendedModule]:
        """Format recommendations for API response"""
        recommendations = []
        
        # Add review modules first
        for module in review_modules[:2]:  # Limit to top 2 review items
            score = scores.get(module.module_id, 0)
            recommendations.append(
                RecommendedModule(
                    module_id=module.module_id,
                    title=f"[REVIEW] {module.title}",
                    difficulty=Difficulty(module.difficulty),
                    estimated_time_minutes=module.estimated_time_minutes,
                    reason=f"Review needed - previous score was {score}%",
                    prerequisites=module.prerequisites
                )
            )
        
        # Add prioritized new modules
        for module, difficulty, priority in prioritized_modules[:5]:  # Limit to top 5
            reason = self._generate_reason(module, difficulty, priority)
            recommendations.append(
                RecommendedModule(
                    module_id=module.module_id,
                    title=module.title,
                    difficulty=difficulty,
                    estimated_time_minutes=module.estimated_time_minutes,
                    reason=reason,
                    prerequisites=module.prerequisites
                )
            )
        
        return recommendations
    
    def _generate_reason(
        self,
        module: Module,
        difficulty: Difficulty,
        priority: int
    ) -> str:
        """Generate human-readable reason for recommendation"""
        reasons = []
        
        if module.order <= 3:
            reasons.append("foundational module")
        elif priority > 150:
            reasons.append("high priority based on your progress")
        
        if difficulty.value != module.difficulty:
            reasons.append(f"adapted to {difficulty.value} difficulty for your level")
        
        if not module.prerequisites:
            reasons.append("no prerequisites required")
        
        if not reasons:
            reasons.append("next logical step in your learning path")
        
        return " - ".join(reasons).capitalize()
    
    def _calculate_average_score(self, scores: Dict[str, int]) -> float:
        """Calculate average quiz score"""
        if not scores:
            return 0.0
        return sum(scores.values()) / len(scores)
    
    def calculate_progress_percentage(
        self,
        completed_modules: List[str]
    ) -> float:
        """Calculate overall course progress percentage"""
        if self.course.total_modules == 0:
            return 0.0
        return (len(completed_modules) / self.course.total_modules) * 100