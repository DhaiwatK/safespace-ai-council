"""
Case management routes
"""
from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime, timedelta
import uuid

from app.models.schemas import (
    Case, ComplaintIntake, SuccessResponse, DashboardStats
)
from app.data.mock_data import get_mock_cases, get_dashboard_stats

router = APIRouter(prefix="/api/cases", tags=["Cases"])


@router.get("", response_model=List[Case])
@router.get("/", response_model=List[Case])
async def get_cases(status: str = None, category: str = None):
    """
    Get all cases with optional filtering
    """
    cases_data = get_mock_cases()

    # Convert to Case objects
    cases = [Case(**case_data) for case_data in cases_data]

    # Apply filters
    if status:
        cases = [c for c in cases if c.status == status]

    if category:
        cases = [c for c in cases if c.category == category]

    return cases


@router.get("/stats", response_model=DashboardStats)
async def get_case_stats():
    """
    Get dashboard statistics
    """
    stats = get_dashboard_stats()
    return DashboardStats(**stats)


@router.get("/{case_id}", response_model=Case)
async def get_case(case_id: str):
    """
    Get a specific case by ID
    """
    cases_data = get_mock_cases()

    for case_data in cases_data:
        if case_data["id"] == case_id or case_data["case_number"] == case_id:
            return Case(**case_data)

    raise HTTPException(status_code=404, detail="Case not found")


@router.post("/intake", response_model=SuccessResponse)
async def submit_complaint(complaint: ComplaintIntake):
    """
    Submit a new complaint
    """

    # Generate case ID and number
    case_id = f"case_{uuid.uuid4().hex[:8]}"
    case_number = f"NW-2025-TIX-{uuid.uuid4().hex[:4].upper()}"

    # In real app, would save to database
    # For demo, just return success

    return SuccessResponse(
        success=True,
        message="Complaint submitted successfully",
        data={
            "case_id": case_id,
            "case_number": case_number,
            "filed_date": datetime.now().isoformat()
        }
    )


@router.patch("/{case_id}/status")
async def update_case_status(case_id: str, status: str):
    """
    Update case status
    """
    # In real app, would update database
    return SuccessResponse(
        success=True,
        message=f"Case {case_id} status updated to {status}",
        data={"case_id": case_id, "new_status": status}
    )
