"""
Mock data for SafeSpace AI Council
Realistic test data for demo purposes
"""
from datetime import datetime, timedelta
import hashlib

# Mock Users
MOCK_USERS = {
    "complainant_1": {
        "id": "user_complainant_001",
        "email": "alex.chen@northwestern.edu",
        "name": "Alex Chen",
        "role": "complainant"
    },
    "complainant_2": {
        "id": "user_complainant_002",
        "email": "sarah.johnson@northwestern.edu",
        "name": "Sarah Johnson",
        "role": "complainant"
    },
    "respondent_1": {
        "id": "user_respondent_001",
        "email": "jordan.martinez@northwestern.edu",
        "name": "Jordan Martinez",
        "role": "respondent"
    },
    "investigator_1": {
        "id": "user_investigator_001",
        "email": "dr.chen@northwestern.edu",
        "name": "Dr. Sarah Chen",
        "role": "investigator"
    },
    "administrator_1": {
        "id": "user_admin_001",
        "email": "dean.martinez@northwestern.edu",
        "name": "Dean Martinez",
        "role": "administrator"
    }
}

# Mock Cases
def get_mock_cases():
    """Generate mock cases with realistic data"""

    base_date = datetime.now()

    return [
        {
            "id": "case_001",
            "case_number": "NW-2025-TIX-0147",
            "complainant_id": "user_complainant_001",
            "respondent_id": "user_respondent_001",
            "category": "Title IX",
            "status": "Investigation",
            "priority": "Standard",
            "filed_date": (base_date - timedelta(days=15)).isoformat(),
            "deadline_date": (base_date + timedelta(days=45)).isoformat(),
            "incident_date": "2025-10-20",
            "incident_location": "Off-campus Party",
            "description": "Complainant alleges that respondent made unwelcome advances at an off-campus party. However, significant inconsistencies in the timeline. Complainant stated incident occurred at 10pm, but witness statements place both parties in different locations. Text messages between complainant and respondent show friendly conversation after alleged incident. No contemporaneous complaints filed. Respondent denies allegations and provides alibi with corroboration.",
            "is_ongoing": False,
            "created_at": (base_date - timedelta(days=15)).isoformat(),
            "updated_at": (base_date - timedelta(days=2)).isoformat(),
            "evidence_count": 4,
            "witness_count": 2,
            "prior_case_count": 0,
            "department": "Kellogg School of Management",
            "department_case_count": 7,
            "relationship": "Peer - Same MBA cohort",
            "complainant_demographics": "Female, 26, second-year MBA",
            "respondent_demographics": "Male, 28, second-year MBA",
            "evidence_summary": "Conflicting witness statements, text messages showing friendly post-incident interaction, respondent's alibi evidence"
        },
        {
            "id": "case_002",
            "case_number": "NW-2025-TIX-0148",
            "complainant_id": "user_complainant_002",
            "respondent_id": None,
            "category": "Harassment",
            "status": "Review",
            "priority": "Urgent",
            "filed_date": (base_date - timedelta(days=3)).isoformat(),
            "deadline_date": (base_date + timedelta(days=57)).isoformat(),
            "incident_date": "2025-11-05",
            "incident_location": "Main Library - 3rd Floor Study Room",
            "description": "Repeated harassing messages and stalking behavior. Complainant reports feeling unsafe on campus. Requesting immediate interim measures.",
            "is_ongoing": True,
            "created_at": (base_date - timedelta(days=3)).isoformat(),
            "updated_at": (base_date - timedelta(days=1)).isoformat(),
            "evidence_count": 2,
            "witness_count": 1,
            "prior_case_count": 0,
            "department": "Weinberg College of Arts & Sciences",
            "department_case_count": 3,
            "relationship": "Unknown - non-student",
            "complainant_demographics": "Female, 20, sophomore",
            "respondent_demographics": "Unknown",
            "evidence_summary": "Screenshots of messages, campus security report"
        },
        {
            "id": "case_003",
            "case_number": "NW-2025-DIS-0089",
            "complainant_id": "user_complainant_001",
            "respondent_id": "user_respondent_001",
            "category": "Discrimination",
            "status": "Closed",
            "priority": "Standard",
            "filed_date": (base_date - timedelta(days=120)).isoformat(),
            "deadline_date": (base_date - timedelta(days=60)).isoformat(),
            "incident_date": "2025-07-15",
            "incident_location": "Kellogg School of Management - Faculty Office",
            "description": "International student from India alleges discrimination in research assistant selection. Professor consistently selected only domestic students despite complainant's higher GPA (3.9 vs avg 3.4) and relevant experience. Complainant overheard professor state 'international students create too much paperwork.' Email trail shows complainant applied 4 times over 2 semesters, never interviewed. Pattern analysis reveals 15 RA positions filled - 0 international students selected despite 40% international student body.",
            "is_ongoing": False,
            "created_at": (base_date - timedelta(days=120)).isoformat(),
            "updated_at": (base_date - timedelta(days=60)).isoformat(),
            "evidence_count": 6,
            "witness_count": 3,
            "prior_case_count": 0,
            "department": "Kellogg School of Management",
            "department_case_count": 2,
            "relationship": "Faculty-Student",
            "complainant_demographics": "Male, 24, international student (India), MS Analytics",
            "respondent_demographics": "Male, 58, tenured professor, 15 years at NU",
            "evidence_summary": "Email applications, witness statement re: discriminatory comment, RA selection data showing statistical disparity, professor's email responses"
        }
    ]

# Mock Evidence
def get_mock_evidence():
    """Generate mock evidence items"""

    return [
        {
            "id": "evd_001",
            "case_id": "case_001",
            "file_name": "email_march_15.pdf",
            "file_type": "application/pdf",
            "file_data": "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKM...",  # Truncated base64
            "uploaded_by": "complainant",
            "uploaded_at": (datetime.now() - timedelta(days=14)).isoformat(),
            "hash": hashlib.sha256(b"mock_email_content").hexdigest(),
            "description": "Email from respondent dated March 15, 2025",
            "ai_extracted_data": {
                "sender": "jordan.martinez@northwestern.edu",
                "date": "2025-03-15 14:32",
                "key_phrases": ["meet up", "drinks"],
                "timeline_position": "2025-03-15"
            }
        },
        {
            "id": "evd_002",
            "case_id": "case_001",
            "file_name": "text_messages_screenshot.png",
            "file_type": "image/png",
            "file_data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",  # Truncated base64
            "uploaded_by": "complainant",
            "uploaded_at": (datetime.now() - timedelta(days=13)).isoformat(),
            "hash": hashlib.sha256(b"mock_screenshot_content").hexdigest(),
            "description": "Text message conversation screenshots",
            "ai_extracted_data": {
                "message_count": 12,
                "date_range": "2025-03-20 to 2025-03-25",
                "sentiment": "persistent_unwelcome_contact"
            }
        },
        {
            "id": "evd_003",
            "case_id": "case_001",
            "file_name": "witness_statement_taylor.pdf",
            "file_type": "application/pdf",
            "file_data": "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKM...",
            "uploaded_by": "investigator",
            "uploaded_at": (datetime.now() - timedelta(days=5)).isoformat(),
            "hash": hashlib.sha256(b"mock_witness_statement_1").hexdigest(),
            "description": "Witness statement from Taylor Kim",
            "ai_extracted_data": {
                "witness_name": "Taylor Kim",
                "corroborates": ["Timeline", "Respondent presence at event"],
                "key_observations": "Witnessed uncomfortable interaction at networking event"
            }
        },
        {
            "id": "evd_004",
            "case_id": "case_002",
            "file_name": "harassing_messages_screenshots.pdf",
            "file_type": "application/pdf",
            "file_data": "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKM...",
            "uploaded_by": "complainant",
            "uploaded_at": (datetime.now() - timedelta(days=2)).isoformat(),
            "hash": hashlib.sha256(b"mock_harassment_screenshots").hexdigest(),
            "description": "Screenshots of harassing messages via social media",
            "ai_extracted_data": {
                "message_count": 47,
                "date_range": "2025-10-28 to 2025-11-05",
                "threat_level": "moderate",
                "escalation_pattern": True
            }
        }
    ]

# Mock AI Analyses (pre-computed for demo speed)
def get_mock_ai_analyses():
    """Pre-computed AI analysis results for instant demo"""

    return [
        {
            "id": "analysis_001",
            "case_id": "case_001",
            "question": "Does this incident meet Title IX hostile environment standard?",
            "consensus_decision": "YES",
            "consensus_confidence": 0.88,
            "created_at": (datetime.now() - timedelta(days=10)).isoformat()
        }
    ]

# Mock Pattern Alerts
def get_mock_patterns():
    """Mock pattern detection results"""

    return [
        {
            "id": "pattern_001",
            "respondent_id": "user_respondent_001",
            "case_ids": ["case_001", "NW-2024-TIX-0089", "NW-2024-TIX-0103"],
            "pattern_type": "Repeat Allegations - Similar MO",
            "risk_score": 0.87,
            "description": "Respondent Jordan Martinez has been named in 3 separate Title IX cases over 18 months. All involve allegations of unwelcome sexual conduct at social/networking events with similar patterns of behavior escalation.",
            "detected_at": (datetime.now() - timedelta(days=5)).isoformat()
        }
    ]

# Dashboard Stats
def get_dashboard_stats():
    """Mock dashboard statistics"""

    return {
        "total_cases": 24,
        "active_cases": 8,
        "pending_review": 3,
        "approaching_deadline": 2,
        "average_resolution_days": 52.3
    }
