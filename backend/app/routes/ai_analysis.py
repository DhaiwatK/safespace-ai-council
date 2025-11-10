"""
AI Analysis routes - Multi-agent consensus system
"""
from fastapi import APIRouter, HTTPException
from typing import List

from app.models.schemas import AIAnalysisRequest, ConsensusResult, PatternAlert
from app.ai_agents.consensus import run_consensus, analyze_title_ix_jurisdiction
from app.data.mock_data import get_mock_cases, get_mock_patterns

router = APIRouter(prefix="/api/ai", tags=["AI Analysis"])


@router.post("/analyze", response_model=ConsensusResult)
async def analyze_case(request: AIAnalysisRequest):
    """
    Run multi-agent consensus analysis on a case

    This is the core innovation - coordinates all 5 AI agents
    """

    # Get case data
    cases = get_mock_cases()
    case_data = None

    for case in cases:
        if case["id"] == request.case_id or case["case_number"] == request.case_id:
            case_data = case
            break

    if not case_data:
        raise HTTPException(status_code=404, detail="Case not found")

    # Run multi-agent consensus
    try:
        result = run_consensus(request.question, case_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")


@router.get("/analyze/title-ix/{case_id}", response_model=ConsensusResult)
async def analyze_title_ix(case_id: str):
    """
    Shortcut: Analyze if case meets Title IX jurisdiction
    Most common analysis question
    """

    # Get case data
    cases = get_mock_cases()
    case_data = None

    for case in cases:
        if case["id"] == case_id or case["case_number"] == case_id:
            case_data = case
            break

    if not case_data:
        raise HTTPException(status_code=404, detail="Case not found")

    # Run Title IX analysis
    try:
        result = analyze_title_ix_jurisdiction(case_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")


@router.get("/patterns/respondent/{respondent_id}", response_model=List[PatternAlert])
async def get_pattern_alerts(respondent_id: str):
    """
    Get pattern detection alerts for a respondent
    """
    patterns = get_mock_patterns()

    # Filter by respondent
    respondent_patterns = [
        PatternAlert(**pattern) for pattern in patterns
        if pattern["respondent_id"] == respondent_id
    ]

    return respondent_patterns


@router.get("/patterns/", response_model=List[PatternAlert])
async def get_all_patterns():
    """
    Get all pattern detection alerts
    """
    patterns = get_mock_patterns()
    return [PatternAlert(**pattern) for pattern in patterns]


@router.post("/bias-check")
async def bias_check_text(text: str):
    """
    Real-time bias detection for investigator report writing
    Uses Equity agent to check for biased language
    """

    # This would use the Equity agent to analyze text
    # For demo, return mock response

    bias_flags = []

    # Simple keyword detection (in real version, would use LLM)
    biased_terms = {
        "emotional": "Consider using 'visible distress' or 'expressed distress' instead of 'emotional'",
        "hysterical": "This term carries significant gender bias. Use 'distressed' or 'agitated' instead.",
        "aggressive": "Ensure this term is applied equally regardless of gender/race.",
    }

    for term, suggestion in biased_terms.items():
        if term.lower() in text.lower():
            bias_flags.append({
                "term": term,
                "suggestion": suggestion,
                "severity": "moderate"
            })

    return {
        "has_bias": len(bias_flags) > 0,
        "flags": bias_flags,
        "overall_tone": "neutral" if not bias_flags else "caution_advised"
    }
