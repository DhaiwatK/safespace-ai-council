"""
Data models for SafeSpace AI Council
"""
from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

# Enums
class CaseCategory(str, Enum):
    TITLE_IX = "Title IX"
    DISCRIMINATION = "Discrimination"
    HARASSMENT = "Harassment"
    RETALIATION = "Retaliation"
    OTHER = "Other"

class CaseStatus(str, Enum):
    INTAKE = "Intake"
    REVIEW = "Review"
    INVESTIGATION = "Investigation"
    HEARING = "Hearing"
    RESOLUTION = "Resolution"
    CLOSED = "Closed"

class Priority(str, Enum):
    URGENT = "Urgent"
    STANDARD = "Standard"

class UserRole(str, Enum):
    COMPLAINANT = "complainant"
    RESPONDENT = "respondent"
    INVESTIGATOR = "investigator"
    ADMINISTRATOR = "administrator"

# Evidence Models
class EvidenceUpload(BaseModel):
    """Evidence file upload"""
    file_name: str
    file_type: str
    file_data: str  # Base64 encoded
    description: Optional[str] = None

class Evidence(BaseModel):
    """Evidence item"""
    id: str
    case_id: str
    file_name: str
    file_type: str
    file_data: str  # Base64
    uploaded_by: str
    uploaded_at: datetime
    hash: str  # SHA-256
    description: Optional[str] = None
    ai_extracted_data: Optional[Dict[str, Any]] = None

# Case Models
class ComplaintIntake(BaseModel):
    """Complaint intake submission"""
    category: CaseCategory
    incident_date: str
    incident_location: Optional[str] = None
    description: str
    is_ongoing: bool = False
    is_crisis: bool = False
    complainant_name: Optional[str] = None
    complainant_email: Optional[str] = None

class Case(BaseModel):
    """Case record"""
    id: str
    case_number: str
    complainant_id: str
    respondent_id: Optional[str] = None
    category: CaseCategory
    status: CaseStatus
    priority: Priority
    filed_date: datetime
    deadline_date: datetime
    incident_date: str
    incident_location: Optional[str] = None
    description: str
    is_ongoing: bool
    created_at: datetime
    updated_at: datetime
    evidence_count: int = 0

# AI Agent Models
class AgentVote(BaseModel):
    """Individual agent's vote and reasoning"""
    agent_name: str
    agent_role: str  # "Legal Compliance", "Trauma-Informed", etc.
    vote: str  # "YES" or "NO"
    confidence: float  # 0.0 to 1.0
    reasoning: str
    citations: Optional[List[str]] = None
    recommendations: Optional[List[str]] = None

class ConsensusResult(BaseModel):
    """Result of multi-agent consensus"""
    question: str
    decision: str  # "YES" or "NO"
    confidence: float  # 0.0 to 1.0
    yes_votes: int
    no_votes: int
    yes_percentage: float
    has_disagreement: bool
    agent_breakdown: List[AgentVote]
    recommendation: str
    analyzed_at: datetime

class AIAnalysisRequest(BaseModel):
    """Request for AI analysis"""
    case_id: str
    question: str
    evidence_ids: Optional[List[str]] = None

# Pattern Detection Models
class PatternAlert(BaseModel):
    """Pattern detection alert"""
    id: str
    respondent_id: str
    case_ids: List[str]
    pattern_type: str
    risk_score: float
    description: str
    detected_at: datetime

# User Models
class User(BaseModel):
    """User account"""
    id: str
    email: str
    name: str
    role: UserRole

class LoginRequest(BaseModel):
    """Login request (demo only)"""
    role: UserRole

class LoginResponse(BaseModel):
    """Login response"""
    user: User
    token: str  # Dummy token for demo

# Dashboard Models
class DashboardStats(BaseModel):
    """Dashboard statistics"""
    total_cases: int
    active_cases: int
    pending_review: int
    approaching_deadline: int
    average_resolution_days: float

# API Response Models
class SuccessResponse(BaseModel):
    """Generic success response"""
    success: bool
    message: str
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    """Error response"""
    success: bool = False
    error: str
    details: Optional[str] = None
