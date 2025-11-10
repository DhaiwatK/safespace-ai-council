"""
Evidence management routes
"""
from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
import uuid
import hashlib
from datetime import datetime
import base64

from app.models.schemas import Evidence, EvidenceUpload, SuccessResponse
from app.data.mock_data import get_mock_evidence

router = APIRouter(prefix="/api/evidence", tags=["Evidence"])


@router.get("/case/{case_id}", response_model=List[Evidence])
async def get_case_evidence(case_id: str):
    """
    Get all evidence for a specific case
    """
    evidence_data = get_mock_evidence()

    # Filter by case
    case_evidence = [
        Evidence(**evd) for evd in evidence_data
        if evd["case_id"] == case_id
    ]

    return case_evidence


@router.get("/{evidence_id}", response_model=Evidence)
async def get_evidence(evidence_id: str):
    """
    Get specific evidence item
    """
    evidence_data = get_mock_evidence()

    for evd in evidence_data:
        if evd["id"] == evidence_id:
            return Evidence(**evd)

    raise HTTPException(status_code=404, detail="Evidence not found")


@router.post("/upload", response_model=SuccessResponse)
async def upload_evidence(case_id: str, upload: EvidenceUpload):
    """
    Upload new evidence (base64 encoded)
    """

    # Generate evidence ID
    evidence_id = f"evd_{uuid.uuid4().hex[:8]}"

    # Calculate hash of file data
    file_hash = hashlib.sha256(upload.file_data.encode()).hexdigest()

    # In real app, would save to storage and database
    # For demo, just return success

    evidence = Evidence(
        id=evidence_id,
        case_id=case_id,
        file_name=upload.file_name,
        file_type=upload.file_type,
        file_data=upload.file_data[:100] + "...",  # Truncate for response
        uploaded_by="complainant",
        uploaded_at=datetime.now(),
        hash=file_hash,
        description=upload.description
    )

    return SuccessResponse(
        success=True,
        message="Evidence uploaded successfully",
        data=evidence.dict()
    )
