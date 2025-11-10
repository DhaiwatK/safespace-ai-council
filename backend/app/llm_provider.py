"""
LLM Provider abstraction - supports local LLM, Anthropic API, and mock responses
"""
import json
import requests
from typing import Dict, Any, Optional
from abc import ABC, abstractmethod

from app.config import Config, LLMProvider


class BaseLLMProvider(ABC):
    """Base class for LLM providers"""

    @abstractmethod
    def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Generate text from prompts"""
        pass


class MockLLMProvider(BaseLLMProvider):
    """Mock LLM for testing - returns realistic hardcoded responses"""

    def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Return mock response based on agent type"""

        # Detect which agent is calling based on system prompt
        if "Title IX legal" in system_prompt or "Lex" in system_prompt:
            return json.dumps({
                "vote": "YES",
                "confidence": 0.95,
                "reasoning": "Incident meets 'severe, pervasive, and objectively offensive' standard per Davis v. Monroe. Pattern of behavior over 3 weeks constitutes hostile environment under Title IX.",
                "citations": ["20 U.S.C. § 1681", "Davis v. Monroe County Board of Education, 526 U.S. 629 (1999)"],
                "procedural_notes": ["Case falls within Title IX jurisdiction", "60-day investigation timeline applies"]
            })

        elif "trauma-informed" in system_prompt or "Sofia" in system_prompt:
            return json.dumps({
                "vote": "YES",
                "confidence": 0.90,
                "reasoning": "Complainant exhibits classic trauma responses including fragmented memory and delayed disclosure. Power dynamic between senior MBA student and junior creates coercive environment. Disclosure timing consistent with trauma research showing delayed reporting is normative.",
                "trauma_indicators": ["Fragmented timeline recall", "Emotional distress during disclosure", "Delayed reporting (trauma-typical)"],
                "recommendations": ["Allow extended timeline for interviews", "Provide trauma-informed interviewer", "Offer support resources (CAPS referral)"]
            })

        elif "bias" in system_prompt or "Equity" in system_prompt:
            return json.dumps({
                "vote": "YES",
                "confidence": 0.85,
                "reasoning": "Gender-based nature of conduct is evident from pattern of comments. Power dynamic analysis shows hierarchical relationship (senior student targeting junior). No indication of retaliatory motive or bias in complaint itself. Language in complainant statement is factual and measured.",
                "bias_flags": [],
                "equity_notes": ["Power imbalance present", "No counter-evidence of bias", "Complaint follows established patterns"]
            })

        elif "evidence" in system_prompt or "Holmes" in system_prompt:
            return json.dumps({
                "vote": "YES",
                "confidence": 0.80,
                "reasoning": "Three witness statements corroborate complainant's timeline of events. Email evidence shows respondent's presence at networking event on stated date. Text messages demonstrate pattern of unwelcome contact. Timeline analysis reveals consistency across sources. Some memory gaps present but do not undermine core narrative.",
                "evidence_strength": "Moderate-Strong",
                "corroboration": ["3 witness statements align with complainant timeline", "Documentary evidence (emails, texts) supports key facts"],
                "gaps": ["Exact timing of specific comments not fully corroborated"]
            })

        elif "risk" in system_prompt or "Sentinel" in system_prompt:
            return json.dumps({
                "vote": "YES",
                "confidence": 0.92,
                "reasoning": "Respondent has two prior anonymous reports with similar allegations (pattern detected). Complainant and respondent share multiple classes - high retaliation risk. Kellogg networking culture creates additional vulnerability. Immediate interim measures recommended.",
                "risk_score": 0.87,
                "pattern_flags": ["Respondent implicated in 2 prior cases", "Similar MO across cases"],
                "recommendations": ["Implement no-contact order", "Monitor for retaliation", "Consider class separation"]
            })

        else:
            # Generic response
            return json.dumps({
                "vote": "YES",
                "confidence": 0.75,
                "reasoning": "Based on the available evidence and applicable standards, this case warrants proceeding with investigation."
            })


class LocalLLMProvider(BaseLLMProvider):
    """Local LLM provider (LM Studio, Ollama, etc.)"""

    def __init__(self):
        self.base_url = Config.LOCAL_LLM_URL
        self.model = Config.LOCAL_LLM_MODEL

    def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Call local LLM API (OpenAI-compatible)"""
        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 1000
                },
                timeout=30
            )
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]

        except Exception as e:
            print(f"Local LLM error: {e}. Falling back to mock.")
            # Fallback to mock on error
            mock_provider = MockLLMProvider()
            return mock_provider.generate(system_prompt, user_prompt)


class AnthropicProvider(BaseLLMProvider):
    """Anthropic Claude API provider"""

    def __init__(self):
        self.api_key = Config.ANTHROPIC_API_KEY
        self.model = Config.ANTHROPIC_MODEL

        if not self.api_key:
            raise ValueError("Anthropic API key not configured")

    def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Call Anthropic API"""
        try:
            import anthropic

            client = anthropic.Anthropic(api_key=self.api_key)

            message = client.messages.create(
                model=self.model,
                max_tokens=1024,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": user_prompt}
                ]
            )

            return message.content[0].text

        except Exception as e:
            print(f"Anthropic API error: {e}. Falling back to mock.")
            # Fallback to mock on error
            mock_provider = MockLLMProvider()
            return mock_provider.generate(system_prompt, user_prompt)


def get_llm_provider() -> BaseLLMProvider:
    """Factory function to get the appropriate LLM provider"""

    provider_type = Config.get_llm_provider()

    if provider_type == LLMProvider.MOCK:
        return MockLLMProvider()

    elif provider_type == LLMProvider.ANTHROPIC:
        if Config.is_anthropic_available():
            return AnthropicProvider()
        else:
            print("Anthropic API key not set. Using mock provider.")
            return MockLLMProvider()

    elif provider_type == LLMProvider.LOCAL:
        if Config.is_local_llm_available():
            return LocalLLMProvider()
        else:
            print("Local LLM not available. Using mock provider.")
            return MockLLMProvider()

    else:
        print(f"Unknown provider: {provider_type}. Using mock.")
        return MockLLMProvider()
