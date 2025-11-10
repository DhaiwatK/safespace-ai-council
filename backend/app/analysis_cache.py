"""
AI Analysis result cache - stores completed analyses in memory
"""
from datetime import datetime
from typing import Dict, Optional

# In-memory cache - stores analysis results
# Key: case_id, Value: ConsensusResult dict
ANALYSIS_CACHE: Dict[str, dict] = {}


def get_cached_analysis(case_id: str) -> Optional[dict]:
    """Get cached analysis result for a case"""
    return ANALYSIS_CACHE.get(case_id)


def cache_analysis(case_id: str, result: dict) -> None:
    """Store analysis result in cache"""
    ANALYSIS_CACHE[case_id] = result


def clear_cache(case_id: str = None) -> None:
    """Clear cache for specific case or all cases"""
    if case_id:
        ANALYSIS_CACHE.pop(case_id, None)
    else:
        ANALYSIS_CACHE.clear()


def has_cached_analysis(case_id: str) -> bool:
    """Check if case has cached analysis"""
    return case_id in ANALYSIS_CACHE


# Pre-populate cache with analysis for case_002 and case_003
def initialize_precomputed_analyses():
    """Load pre-computed analyses for demo cases"""

    # Case 002 - Strong harassment case
    ANALYSIS_CACHE["case_002"] = {
        "question": "Does this incident meet Title IX hostile environment standard?",
        "decision": "YES",
        "confidence": 0.92,
        "yes_votes": 5,
        "no_votes": 0,
        "yes_percentage": 100.0,
        "has_disagreement": False,
        "agent_breakdown": [
            {
                "agent_name": "Lex",
                "agent_role": "Legal Compliance",
                "vote": "YES",
                "confidence": 0.94,
                "reasoning": "Repeated harassing messages meet Title IX hostile environment standard. Pattern of escalating behavior over 8-day period creates objectively offensive environment under Davis v. Monroe. Complainant's fear for safety demonstrates substantial interference with educational access. Ongoing nature triggers mandatory interim protective measures under 2020 Title IX regulations.",
                "citations": [
                    "Davis v. Monroe County Board of Education, 526 U.S. 629 (1999) - hostile environment standard",
                    "2020 Title IX Final Rule §106.44 - mandatory response to sexual harassment",
                    "Pattern of escalation meets 'severe or pervasive' threshold",
                    "Northwestern University Title IX Policy Section 5.2 - interim measures required"
                ],
                "recommendations": ["Immediate interim protective measures", "No-contact order recommended", "Expedited investigation timeline"]
            },
            {
                "agent_name": "Sofia",
                "agent_role": "Trauma-Informed Advocate",
                "vote": "YES",
                "confidence": 0.95,
                "reasoning": "Complainant exhibits clear trauma indicators consistent with stalking/harassment victimization. Reports of feeling unsafe, hypervigilance, and academic impact align with psychological research on harassment trauma. 47 messages over 8 days demonstrates pattern of unwanted contact creating sustained psychological distress. Complainant's immediate reporting (within 2 days) indicates acute crisis state requiring urgent support.",
                "citations": [
                    "Pattern of harassment creates cumulative trauma exposure",
                    "Fear response and hypervigilance consistent with stalking trauma (Spitzberg & Cupach, 2007)",
                    "Academic disruption indicates substantial educational impact",
                    "Immediate reporting typical of ongoing threat situations"
                ],
                "recommendations": ["Connect with CAPS immediately", "Campus safety escort services", "Flexible academic accommodations during investigation"]
            },
            {
                "agent_name": "Equity",
                "agent_role": "Bias Detection",
                "vote": "YES",
                "confidence": 0.89,
                "reasoning": "Case presents straightforward harassment pattern without apparent bias indicators in reporting or investigation. Complainant's account is credible and consistent. However, investigators should ensure equal application of standards if respondent identified. Gender/race demographics of both parties should be documented to ensure equitable treatment throughout process.",
                "citations": [
                    "No language bias detected in complainant statement",
                    "Harassment pattern clear and well-documented",
                    "Recommend documenting respondent demographics when identified",
                    "Ensure interview protocols applied equally to all parties"
                ],
                "recommendations": ["Standard unbiased investigation procedures", "Document all procedural decisions", "Equal treatment monitoring"]
            },
            {
                "agent_name": "Holmes",
                "agent_role": "Evidence Analysis",
                "vote": "YES",
                "confidence": 0.90,
                "reasoning": "Documentary evidence is substantial and well-preserved. 47 message screenshots provide clear pattern evidence with verifiable metadata. Campus security report corroborates complainant's timeline and fear state. Evidence chain of custody properly maintained. Message content analysis shows escalating threatening language and persistent unwanted contact despite complainant's clear boundaries.",
                "citations": [
                    "47 documented harassing messages with timestamps (Oct 28 - Nov 5)",
                    "Campus security report filed Nov 5 at 3:42pm corroborates fear state",
                    "Message metadata analysis confirms escalation pattern",
                    "Screenshot authenticity verifiable through social media platform data",
                    "Evidence preserved with proper SHA-256 hashing"
                ],
                "recommendations": ["Subpoena full message history from platform", "Obtain IP/device logs if needed", "Interview campus security officer"]
            },
            {
                "agent_name": "Sentinel",
                "agent_role": "Risk Assessment",
                "vote": "YES",
                "confidence": 0.93,
                "reasoning": "HIGH RISK: Escalating stalking/harassment pattern with unknown respondent creates significant safety concern. 47 messages in 8 days indicates obsessive behavior. Complainant reports feeling unsafe on campus - credible immediate threat to student safety. Unknown perpetrator status increases risk - may be non-student with unrestricted campus access. URGENT: Immediate protective measures required. Campus police notification recommended.",
                "citations": [
                    "Escalation pattern: 5 messages Oct 28 → 12 messages Nov 4 (threat escalation)",
                    "Unknown perpetrator = elevated risk profile",
                    "Campus access by non-student perpetrator = institutional security concern",
                    "Risk assessment score: 8.9/10 (critical)",
                    "Immediate safety plan required under Title IX duty of care"
                ],
                "recommendations": ["URGENT: Interim protective measures immediately", "Campus police involvement", "Safety escort services", "Consider emergency no-trespass order if respondent identified"]
            }
        ],
        "recommendation": "✓ HIGH CONFIDENCE: Unanimous consensus (5/5 YES votes). Strong evidence base with clear Title IX violation. URGENT: Immediate interim protective measures required. Expedited investigation timeline recommended. Campus safety coordination essential.",
        "analyzed_at": datetime.now().isoformat()
    }

    # Case 003 - Discrimination case (pre-analyzed, closed case)
    ANALYSIS_CACHE["case_003"] = {
        "question": "Does this incident meet Title IX hostile environment standard?",
        "decision": "YES",
        "confidence": 0.88,
        "yes_votes": 5,
        "no_votes": 0,
        "yes_percentage": 100.0,
        "has_disagreement": False,
        "agent_breakdown": [
            {
                "agent_name": "Lex",
                "agent_role": "Legal Compliance",
                "vote": "YES",
                "confidence": 0.91,
                "reasoning": "Systematic exclusion based on national origin meets Title IX gender discrimination standard (international student status often correlates with protected characteristics). Pattern of discriminatory RA selection with explicit verbal evidence ('international students create too much paperwork') establishes intentional discrimination. Statistical disparity (0 international students in 15 positions vs. 40% international student body) creates prima facie discrimination case under disparate impact doctrine.",
                "citations": [
                    "Title IX prohibits national origin discrimination in educational programs",
                    "McDonnell Douglas burden-shifting framework applies",
                    "Statistical disparity: 0/15 hires vs 40% eligible population = significant deviation",
                    "Verbal evidence of discriminatory intent strengthens case",
                    "Pattern over 2 semesters (4 applications, 0 interviews) demonstrates systematic exclusion"
                ],
                "recommendations": ["Finding of discrimination supported", "Remedial action required", "Policy review for RA selection process"]
            },
            {
                "agent_name": "Sofia",
                "agent_role": "Trauma-Informed Advocate",
                "vote": "YES",
                "confidence": 0.85,
                "reasoning": "Chronic discrimination creates cumulative psychological harm. Complainant's repeated rejections despite superior qualifications (GPA 3.9 vs avg 3.4) causes professional/academic self-doubt. Overhearing discriminatory comment compounds emotional impact. International students face additional isolation/vulnerability - systematic exclusion exacerbates these stressors. Pattern of rejection affects career trajectory and sense of belonging.",
                "citations": [
                    "Chronic discrimination linked to measurable psychological distress (Sue et al., 2007)",
                    "Microaggression accumulation affects academic performance and mental health",
                    "International student status creates additional vulnerability",
                    "Professional opportunity denial impacts career development"
                ],
                "recommendations": ["Provide access to CAPS services", "Career counseling support", "Academic accommodations if needed"]
            },
            {
                "agent_name": "Equity",
                "agent_role": "Bias Detection",
                "vote": "YES",
                "confidence": 0.92,
                "reasoning": "Statistical analysis reveals clear discriminatory pattern. Zero international students selected in 15 RA positions while comprising 40% of eligible student body represents statistically significant disparity (p<0.001). Complainant's superior qualifications (GPA 3.9 vs average 3.4) with zero interviews demonstrates selection bias. Verbal evidence ('too much paperwork') provides direct proof of discriminatory motive. No legitimate pedagogical justification documented.",
                "citations": [
                    "Statistical disparity: Expected 6 international students (40% of 15), Actual: 0 (100% deviation)",
                    "Complainant qualification superiority: 3.9 GPA vs 3.4 average selected candidates",
                    "4 applications, 0 interviews despite superior credentials = systematic exclusion",
                    "Direct verbal evidence of discriminatory intent",
                    "No documented performance-based rationale for differential treatment"
                ],
                "recommendations": ["Finding of discrimination supported", "Corrective action plan required", "Anti-discrimination training for faculty"]
            },
            {
                "agent_name": "Holmes",
                "agent_role": "Evidence Analysis",
                "vote": "YES",
                "confidence": 0.86,
                "reasoning": "Documentary evidence is substantial: 4 email applications with timestamps, 3 witness statements (including direct quote of discriminatory comment), and RA selection data showing statistical pattern. Email trail establishes repeated attempts and professor's brief dismissive responses. Witness credibility strong (multiple corroborating sources). Selection data independently verifiable through department records.",
                "citations": [
                    "4 documented email applications (Sept 2024, Nov 2024, Feb 2025, April 2025)",
                    "Witness statement: Direct quote 'international students create too much paperwork'",
                    "2 additional witnesses corroborate pattern observation",
                    "RA selection data: 15 positions analyzed, 0 international students selected",
                    "Department data confirms 40% international student enrollment in MS Analytics program"
                ],
                "recommendations": ["Evidence sufficient for discrimination finding", "Request complete RA selection records", "Interview all 3 witnesses"]
            },
            {
                "agent_name": "Sentinel",
                "agent_role": "Risk Assessment",
                "vote": "YES",
                "confidence": 0.87,
                "reasoning": "MODERATE-HIGH RISK: Pattern represents systemic discrimination risk with potential for additional unreported victims. Professor's 15-year tenure with apparent longstanding bias creates institutional liability exposure. Zero international student RA selections over multiple semesters indicates entrenched discriminatory practice. Risk of reputational harm if case publicized. Recommend immediate audit of all faculty RA selection practices and comprehensive anti-discrimination training.",
                "citations": [
                    "Systemic pattern over 2+ semesters indicates entrenched practice",
                    "15-year tenured professor = difficult remediation but necessary",
                    "Potential for additional victims (other international students excluded)",
                    "Institutional liability exposure: Moderate-High",
                    "Recommend department-wide RA selection audit"
                ],
                "recommendations": ["Departmental audit of RA selections", "Faculty anti-discrimination training", "Corrective action plan", "Monitor ongoing RA selections"]
            }
        ],
        "recommendation": "✓ HIGH CONFIDENCE: Unanimous consensus (5/5 YES votes). Clear discrimination pattern with strong statistical and testimonial evidence. Finding of discrimination supported. Remedial action required including corrective measures, faculty training, and policy review.",
        "analyzed_at": (datetime.now()).isoformat()
    }

    print(f"✓ Pre-loaded analysis cache for {len(ANALYSIS_CACHE)} cases")


# Initialize on module load
initialize_precomputed_analyses()
