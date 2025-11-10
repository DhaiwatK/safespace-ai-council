"""
Multi-Agent Consensus Mechanism
Coordinates all 5 AI agents and calculates consensus results
"""
import json
from datetime import datetime
from typing import List, Dict, Any

from app.ai_agents import lex, sofia, equity, holmes, sentinel
from app.llm_provider import get_llm_provider
from app.models.schemas import AgentVote, ConsensusResult


# All available agents
AGENTS = [
    {"module": lex, "name": lex.AGENT_NAME, "role": lex.AGENT_ROLE},
    {"module": sofia, "name": sofia.AGENT_NAME, "role": sofia.AGENT_ROLE},
    {"module": equity, "name": equity.AGENT_NAME, "role": equity.AGENT_ROLE},
    {"module": holmes, "name": holmes.AGENT_NAME, "role": holmes.AGENT_ROLE},
    {"module": sentinel, "name": sentinel.AGENT_NAME, "role": sentinel.AGENT_ROLE},
]


def parse_agent_response(response_text: str, agent_name: str) -> Dict[str, Any]:
    """Parse JSON response from agent, with error handling"""
    try:
        # Try to parse as JSON
        data = json.loads(response_text)
        return data
    except json.JSONDecodeError:
        # If not valid JSON, try to extract JSON from markdown code blocks
        if "```json" in response_text:
            json_start = response_text.find("```json") + 7
            json_end = response_text.find("```", json_start)
            json_str = response_text[json_start:json_end].strip()
            try:
                return json.loads(json_str)
            except:
                pass

        # Fallback: return a default response
        print(f"Warning: Could not parse response from {agent_name}. Using default.")
        return {
            "vote": "ABSTAIN",
            "confidence": 0.5,
            "reasoning": f"Agent {agent_name} response could not be parsed.",
            "error": "Parse failure"
        }


def run_consensus(question: str, case_data: Dict[str, Any]) -> ConsensusResult:
    """
    Run multi-agent consensus analysis

    Args:
        question: The question to analyze (e.g., "Does this meet Title IX standards?")
        case_data: Dictionary containing case information

    Returns:
        ConsensusResult with all agent votes and consensus decision
    """

    llm_provider = get_llm_provider()
    agent_votes = []

    # Collect votes from all agents
    for agent_config in AGENTS:
        agent_module = agent_config["module"]
        agent_name = agent_config["name"]
        agent_role = agent_config["role"]

        print(f"Consulting {agent_name} ({agent_role})...")

        # Build prompts using agent's specific prompt builder
        system_prompt = agent_module.SYSTEM_PROMPT
        user_prompt = agent_module.build_prompt(question, case_data)

        # Get LLM response
        response_text = llm_provider.generate(system_prompt, user_prompt)

        # Parse response
        parsed_response = parse_agent_response(response_text, agent_name)

        # Extract vote data
        vote = parsed_response.get("vote", "ABSTAIN")
        confidence = float(parsed_response.get("confidence", 0.5))
        reasoning = parsed_response.get("reasoning", "No reasoning provided.")

        # Extract optional fields (different for each agent)
        citations = parsed_response.get("citations", [])
        recommendations = parsed_response.get("recommendations", [])

        # Combine all extra fields for display
        if not recommendations:
            # Check for agent-specific recommendation fields
            recommendations.extend(parsed_response.get("procedural_notes", []))
            recommendations.extend(parsed_response.get("trauma_indicators", []))
            recommendations.extend(parsed_response.get("bias_flags", []))
            recommendations.extend(parsed_response.get("pattern_flags", []))

        # Create AgentVote object
        agent_vote = AgentVote(
            agent_name=agent_name,
            agent_role=agent_role,
            vote=vote,
            confidence=confidence,
            reasoning=reasoning,
            citations=citations if citations else None,
            recommendations=recommendations if recommendations else None
        )

        agent_votes.append(agent_vote)

    # Calculate consensus
    consensus = calculate_consensus(question, agent_votes)

    return consensus


def calculate_consensus(question: str, agent_votes: List[AgentVote]) -> ConsensusResult:
    """
    Calculate consensus from agent votes

    Uses weighted voting based on confidence scores
    """

    yes_votes = [v for v in agent_votes if v.vote == "YES"]
    no_votes = [v for v in agent_votes if v.vote == "NO"]

    # Calculate weighted votes
    yes_weight = sum(v.confidence for v in yes_votes)
    no_weight = sum(v.confidence for v in no_votes)

    total_weight = yes_weight + no_weight

    if total_weight == 0:
        # All agents abstained
        decision = "UNCERTAIN"
        confidence = 0.0
        yes_percentage = 0.0
    else:
        # Determine decision based on weighted votes
        decision = "YES" if yes_weight > no_weight else "NO"
        confidence = max(yes_weight, no_weight) / total_weight
        yes_percentage = (yes_weight / total_weight) * 100

    # Check for disagreement
    confidence_values = [v.confidence for v in agent_votes]
    confidence_spread = max(confidence_values) - min(confidence_values) if confidence_values else 0

    has_disagreement = (
        confidence_spread > 0.3 or
        (len(yes_votes) > 0 and len(no_votes) > 0)
    )

    # Generate recommendation
    recommendation = generate_recommendation(decision, confidence, has_disagreement)

    return ConsensusResult(
        question=question,
        decision=decision,
        confidence=round(confidence, 2),
        yes_votes=len(yes_votes),
        no_votes=len(no_votes),
        yes_percentage=round(yes_percentage, 1),
        has_disagreement=has_disagreement,
        agent_breakdown=agent_votes,
        recommendation=recommendation,
        analyzed_at=datetime.now()
    )


def generate_recommendation(decision: str, confidence: float, has_disagreement: bool) -> str:
    """Generate human-readable recommendation based on consensus"""

    if has_disagreement:
        return "⚠️ CAUTION: Agents show significant disagreement. Human review strongly recommended."

    if confidence < 0.7:
        return "⚠️ LOW CONFIDENCE: Additional evidence or analysis may be needed before proceeding."

    if confidence > 0.9:
        return "✓ HIGH CONFIDENCE: Strong consensus reached across all agents."

    return "→ MODERATE CONFIDENCE: Proceed with standard review process."


# Convenience function for common Title IX question
def analyze_title_ix_jurisdiction(case_data: Dict[str, Any]) -> ConsensusResult:
    """Shortcut to analyze if case meets Title IX jurisdiction"""
    question = "Does this incident meet Title IX hostile environment standard and fall within institutional jurisdiction?"
    return run_consensus(question, case_data)
