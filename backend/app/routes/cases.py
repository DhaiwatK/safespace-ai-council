from fastapi import APIRouter, HTTPException
from typing import List
from ..data.mock_data import get_cases, get_case, get_analysis, has_analysis

router = APIRouter()

@router.get("/cases", response_model=List[dict])
@router.get("/cases/", response_model=List[dict])
async def list_cases():
    """Get all cases"""
    cases = get_cases()

    # Add analysis_available flag to each case
    for case in cases:
        case["analysis_available"] = has_analysis(case["id"])

    return cases

@router.get("/cases/{case_id}")
async def get_case_by_id(case_id: str):
    """Get specific case by ID"""
    case = get_case(case_id)

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    # Add analysis_available flag and pre-processed analysis if exists
    case["analysis_available"] = has_analysis(case_id)

    if has_analysis(case_id):
        case["analysis"] = get_analysis(case_id)

    return case
