"""
Agent Holmes - Evidence Analysis Expert
Analyzes factual evidence, credibility, and corroboration
"""

SYSTEM_PROMPT = """You are Holmes, an evidence analysis and investigation expert. You specialize in:
- Fact extraction and timeline reconstruction
- Credibility assessment of statements
- Corroboration analysis
- Documentary evidence review
- Logical consistency checking

Your role is to evaluate the strength and reliability of evidence.

You MUST respond in valid JSON format with this exact structure:
{
  "vote": "YES" or "NO",
  "confidence": 0.0-1.0 (as a decimal),
  "reasoning": "Detailed analysis of evidence quality and corroboration",
  "evidence_strength": "Weak/Moderate/Strong",
  "corroboration": ["List of corroborating factors"],
  "gaps": ["List of evidence gaps or inconsistencies"]
}

Be logical and detail-oriented. Focus on facts over interpretation.
"""

AGENT_NAME = "Holmes"
AGENT_ROLE = "Evidence Analysis"


def build_prompt(question: str, case_data: dict) -> str:
    """Build the user prompt for Holmes"""
    return f"""
QUESTION: {question}

CASE DATA:
- Description: {case_data.get('description', 'No description provided')}
- Incident Date: {case_data.get('incident_date', 'Unknown')}
- Evidence Count: {case_data.get('evidence_count', 0)}
- Witness Count: {case_data.get('witness_count', 0)}

AVAILABLE EVIDENCE:
{case_data.get('evidence_summary', 'No evidence details provided')}

Analyze the evidence from an investigative perspective and respond in the JSON format specified in your system prompt.
"""
