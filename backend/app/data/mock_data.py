"""
Mock data for SAFESPACE AI Council demo
Includes cases and pre-processed AI analysis results
"""

# Mock cases
MOCK_CASES = [
    {
        "id": "0147",
        "case_number": "NW-2025-TIX-0147",
        "category": "Title IX - Sexual Harassment",
        "status": "Investigation",
        "priority": "Standard",
        "filed_date": "2025-03-15",
        "description": "Complainant reports unwanted sexual advances by fellow MBA student at off-campus networking event. Incident occurred on March 12. However, timeline inconsistencies noted: complainant states event was 'around 8pm' but event ended at 7:30pm per venue records. Witness A recalls seeing complainant leave alone at 7:15pm, but complainant claims incident happened 'after everyone left.' No corroborating physical evidence submitted.",
        "evidence_count": 2,
        "witness_count": 1
    },
    {
        "id": "0148",
        "case_number": "NW-2025-TIX-0148",
        "category": "Title IX - Sexual Assault",
        "status": "Investigation",
        "priority": "Urgent",
        "filed_date": "2025-03-18",
        "description": "Complainant reports sexual assault by respondent during study session in graduate housing. Incident occurred March 16, 2025 at approximately 11:30pm. Three witnesses corroborate complainant's timeline and observed distressed state immediately after. Security footage confirms respondent entering and leaving building at times consistent with complainant's account. Text messages from 11:47pm show complainant reaching out to friend for support. Medical examination conducted within 24 hours.",
        "evidence_count": 8,
        "witness_count": 3
    },
    {
        "id": "0149",
        "case_number": "NW-2025-TIX-0149",
        "category": "Title IX - Discrimination",
        "status": "Intake",
        "priority": "Standard",
        "filed_date": "2025-03-20",
        "description": "Complainant alleges gender-based discrimination in faculty advisor assignment and research opportunities. Reports systematic exclusion from lab meetings and co-authorship opportunities while male peers received preferential treatment. Email records show 12 instances where complainant was excluded from group communications. Two other students (one current, one graduated) report similar patterns with same advisor.",
        "evidence_count": 15,
        "witness_count": 2
    }
]

# Pre-processed AI analysis results
# Case 0148 - Strong evidence, high consensus YES
ANALYSIS_0148 = {
    "question": "Does this incident meet Title IX hostile environment standard?",
    "consensus_decision": "YES",
    "consensus_confidence": 0.94,
    "yes_votes": 5,
    "no_votes": 0,
    "yes_percentage": 100.0,
    "disagreement_flag": False,
    "recommendation": "HIGH CONFIDENCE: Strong consensus reached across all analysis frameworks. Evidence is substantial and corroborated. Proceed with formal investigation following standard protocols. Consider immediate interim protective measures.",
    "agent_votes": [
        {
            "agent": "Lex",
            "specialty": "Legal Compliance Specialist",
            "vote": "YES",
            "confidence": 0.96,
            "reasoning": "The described behavior clearly meets the legal standard for Title IX sexual assault. The conduct was unwelcome, severe, and interfered with the complainant's educational opportunities. All procedural elements for Title IX jurisdiction are satisfied: incident occurred in university-controlled housing, both parties are students, complainant filed within reasonable timeframe.",
            "citations": [
                "20 U.S.C. § 1681 (Title IX statute)",
                "Davis v. Monroe County Board of Education, 526 U.S. 629 (1999) - severe conduct standard",
                "OCR 2020 Title IX Final Rule §106.44 - response requirements",
                "Northwestern University Title IX Policy Section 4.2 - formal complaint process"
            ]
        },
        {
            "agent": "Sofia",
            "specialty": "Trauma-Informed Specialist",
            "vote": "YES",
            "confidence": 0.92,
            "reasoning": "Complainant's account shows clear trauma indicators consistent with genuine assault disclosure. Immediate disclosure to friend (within 17 minutes) is typical of authentic trauma responses. Seeking medical examination within 24 hours demonstrates appropriate help-seeking behavior. Witnesses observed visible distress, supporting psychological impact. The prompt reporting timeline and consistency of account across multiple tellings indicates high credibility.",
            "citations": [
                "Immediate disclosure typical in 67% of assault cases (Krebs et al., 2016)",
                "Witness corroboration of distress state strengthens credibility",
                "Medical examination sought promptly - consistent with trauma response",
                "No indicators of fabricated account or secondary gain motives"
            ]
        },
        {
            "agent": "Equity",
            "specialty": "Bias Detection Specialist",
            "vote": "YES",
            "confidence": 0.93,
            "reasoning": "Analysis of both accounts and investigator language reveals no significant bias. Language used is balanced and neutral across all parties. Both complainant and respondent given equal opportunity to present evidence and tell their stories. Interview durations were comparable. No gender-based language discrepancies detected in case documentation. Power dynamics appropriately considered (both are students, no hierarchical relationship).",
            "citations": [
                "Neutral language ratio: 96% compliant with bias-free standards",
                "No gender-based language discrepancies detected",
                "Equal treatment metrics: Interview time within 5% variance",
                "No victim-blaming language present in investigator notes"
            ]
        },
        {
            "agent": "Holmes",
            "specialty": "Evidence Analysis Specialist",
            "vote": "YES",
            "confidence": 0.95,
            "reasoning": "Physical and digital evidence strongly corroborates complainant's timeline and account. Security camera footage timestamps match complainant's stated timeline within 3-minute margin. Text message metadata confirms outreach at 11:47pm, consistent with 11:30pm incident time. Three independent witnesses verify complainant's distressed state within 30 minutes of incident. Medical examination provides additional forensic support. No contradictory evidence has been presented. Chain of custody intact for all digital evidence.",
            "citations": [
                "3 witnesses independently corroborate complainant's timeline and distress",
                "Security footage timestamp verified: 11:28pm entry, 12:14am exit",
                "Text message metadata confirms: sent 11:47pm, received 11:48pm",
                "Medical examination conducted March 17, 2025 at 2:15pm (within 24h window)",
                "SHA-256 hash verified for all digital evidence - integrity confirmed"
            ]
        },
        {
            "agent": "Sentinel",
            "specialty": "Risk Assessment Specialist",
            "vote": "YES",
            "confidence": 0.94,
            "reasoning": "CRITICAL RISK: Database check reveals respondent has one prior informal complaint from 2023 involving similar allegations (unwanted sexual contact). Pattern suggests escalating behavior. Without institutional intervention, risk modeling predicts 82% probability of repeat offense within 18 months. Complainant shows documented psychological impact (counseling intake same week, temporary medical withdrawal from one course). Failure to investigate would expose institution to deliberate indifference liability under Title IX. URGENT recommendation: Implement interim restrictions immediately pending investigation outcome.",
            "citations": [
                "Prior complaint: NW-2023-TIX-0089 (informal resolution, similar pattern)",
                "Risk assessment score: 8.7/10 (high risk category)",
                "Reoffense probability model: 82% within 18 months without intervention",
                "Complainant documented harm: CAPS intake 3/18, course withdrawal 3/19",
                "Institutional liability exposure: HIGH under Gebser/Davis standards"
            ]
        }
    ]
}

# Case 0149 - Strong evidence for discrimination, high consensus YES
ANALYSIS_0149 = {
    "question": "Does this incident meet Title IX hostile environment standard?",
    "consensus_decision": "YES",
    "consensus_confidence": 0.88,
    "yes_votes": 5,
    "no_votes": 0,
    "yes_percentage": 100.0,
    "disagreement_flag": False,
    "recommendation": "HIGH CONFIDENCE: Clear pattern of gender-based discrimination with substantial documentary evidence. Email records demonstrate systematic exclusion. Corroborating witnesses strengthen case. Proceed with formal investigation. Consider interim measures to ensure complainant's access to research opportunities during investigation.",
    "agent_votes": [
        {
            "agent": "Lex",
            "specialty": "Legal Compliance Specialist",
            "vote": "YES",
            "confidence": 0.90,
            "reasoning": "The systematic exclusion based on gender meets the legal threshold for Title IX gender discrimination. Pattern of differential treatment in academic opportunities constitutes hostile educational environment. Email evidence demonstrates clear disparate treatment. The presence of corroborating witnesses reporting similar treatment patterns strengthens the legal case for Title IX violation. Faculty advisor's conduct falls within university's educational program jurisdiction.",
            "citations": [
                "Title IX prohibits gender discrimination in educational programs (20 U.S.C. § 1681)",
                "Academic opportunity disparities constitute discriminatory environment",
                "Pattern evidence across multiple complainants strengthens case (Matthews v. Nat'l Collegiate Athletic Ass'n)",
                "Northwestern Faculty Code of Conduct Section 2.3 - equitable treatment requirements"
            ]
        },
        {
            "agent": "Sofia",
            "specialty": "Trauma-Informed Specialist",
            "vote": "YES",
            "confidence": 0.85,
            "reasoning": "Complainant's account reflects psychological harm consistent with sustained discrimination exposure. Systematic exclusion from professional development opportunities creates cumulative trauma impact. The presence of corroborating witnesses who report similar patterns validates complainant's experience and reduces isolation. Chronic exposure to exclusionary environment demonstrates ongoing hostile conditions rather than isolated incident.",
            "citations": [
                "Chronic discrimination exposure linked to measurable psychological distress (Nadal et al., 2014)",
                "Pattern recognition by multiple parties validates individual experience",
                "Professional opportunity denial impacts career development and self-efficacy",
                "Witness corroboration reduces isolation and validates complainant perception"
            ]
        },
        {
            "agent": "Equity",
            "specialty": "Bias Detection Specialist",
            "vote": "YES",
            "confidence": 0.89,
            "reasoning": "Documentary evidence reveals clear gender-based pattern: 12 documented instances where complainant (female) was excluded from group communications while male peers were consistently included. Statistical analysis shows male students in same cohort received 3.2x more co-authorship opportunities. Two additional witnesses report identical patterns with same faculty member, indicating systemic rather than interpersonal issue. No legitimate pedagogical justification apparent for differential treatment.",
            "citations": [
                "Gender disparity analysis: 12 exclusion instances, 0 male peer exclusions in same timeframe",
                "Co-authorship opportunity ratio: Male students 3.2x, statistically significant (p<0.01)",
                "Pattern replication across 3 students (different cohorts) indicates systemic behavior",
                "No documented performance-based rationale for differential treatment"
            ]
        },
        {
            "agent": "Holmes",
            "specialty": "Evidence Analysis Specialist",
            "vote": "YES",
            "confidence": 0.90,
            "reasoning": "Email metadata analysis confirms systematic exclusion pattern. 12 documented emails sent to 'All Lab Members' distribution list that excluded complainant while including 4 male peers at same academic level. Email timestamps show pattern occurred over 8-month period (July 2024 - February 2025), demonstrating sustained rather than isolated behavior. Two witnesses (one current student, one 2023 graduate) provide independent corroboration of similar exclusionary patterns with same faculty advisor. Documentary evidence is substantial and verifiable.",
            "citations": [
                "12 verifiable email exclusions documented with metadata",
                "Timeline analysis: 8-month sustained pattern (July 2024 - February 2025)",
                "2 independent witnesses report similar patterns (2023 and 2024-2025 academic years)",
                "Email distribution list analysis confirms selective exclusion by gender",
                "No contradictory evidence or legitimate alternative explanation provided"
            ]
        },
        {
            "agent": "Sentinel",
            "specialty": "Risk Assessment Specialist",
            "vote": "YES",
            "confidence": 0.87,
            "reasoning": "HIGH RISK: Faculty member's pattern spans multiple years (2023-2025) affecting at least 3 students. This represents systemic discrimination risk with potential for additional unreported victims. Failure to investigate creates precedent that could enable continued discriminatory practices. Academic impact on complainant's career trajectory is substantial (lack of co-authorship opportunities directly impacts graduate school/career prospects). Institutional reputation risk is elevated given corroborating pattern evidence. Recommend immediate investigation and interim monitoring of advisor's student assignments.",
            "citations": [
                "Multi-year pattern (2023-2025) indicates entrenched behavior",
                "3 known affected students suggests potential for additional unreported victims",
                "Academic opportunity denial has measurable career impact for graduate students",
                "Institutional liability exposure: MODERATE-HIGH under Title IX standards",
                "Recommendation: Interim monitoring of advisor-student communications during investigation"
            ]
        }
    ]
}

# Mock analysis results storage - case 0147 will NOT have pre-processed results
MOCK_ANALYSIS_RESULTS = {
    "0148": ANALYSIS_0148,
    "0149": ANALYSIS_0149
    # 0147 intentionally omitted - user must click "Analyze" button
}

def get_cases():
    """Return all mock cases"""
    return MOCK_CASES

def get_case(case_id: str):
    """Return specific case by ID"""
    for case in MOCK_CASES:
        if case["id"] == case_id:
            return case
    return None

def get_analysis(case_id: str):
    """Return pre-processed analysis if available"""
    return MOCK_ANALYSIS_RESULTS.get(case_id)

def has_analysis(case_id: str):
    """Check if case has pre-processed analysis"""
    return case_id in MOCK_ANALYSIS_RESULTS
