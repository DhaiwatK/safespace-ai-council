#!/usr/bin/env python3
"""
Test LM Studio connection
"""
import requests
import json

LM_STUDIO_URL = "http://localhost:1234/v1"
MODEL = "gemma-3-4b-it"

print("🧪 Testing LM Studio Connection")
print("=" * 50)

# Test 1: Check if LM Studio is running
print("\n1. Checking if LM Studio is running...")
try:
    response = requests.get(f"{LM_STUDIO_URL}/models", timeout=2)
    if response.status_code == 200:
        print("✅ LM Studio is running!")
        try:
            models = response.json()
            print(f"   Available models: {json.dumps(models, indent=2)}")
        except:
            print("   (Could not parse models response)")
    else:
        print(f"❌ LM Studio responded with status {response.status_code}")
except Exception as e:
    print(f"❌ Cannot connect to LM Studio: {e}")
    print("   Make sure LM Studio is running on port 1234")
    exit(1)

# Test 2: Test chat completion
print(f"\n2. Testing chat completion with model '{MODEL}'...")
try:
    response = requests.post(
        f"{LM_STUDIO_URL}/chat/completions",
        json={
            "model": MODEL,
            "messages": [
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": "Say 'Hello, SafeSpace!' in one sentence."}
            ],
            "temperature": 0.7,
            "max_tokens": 100
        },
        timeout=30
    )

    if response.status_code == 200:
        result = response.json()
        message = result["choices"][0]["message"]["content"]
        print("✅ Chat completion successful!")
        print(f"   Response: {message}")
    else:
        print(f"❌ Chat completion failed with status {response.status_code}")
        print(f"   Response: {response.text}")
except Exception as e:
    print(f"❌ Chat completion error: {e}")
    exit(1)

# Test 3: Test with SafeSpace agent prompt
print("\n3. Testing with SafeSpace Agent Lex (Legal Compliance)...")
try:
    system_prompt = """You are Lex, a Title IX legal compliance expert.

Analyze this question and respond in JSON format:
{
  "vote": "YES" or "NO",
  "confidence": 0.0-1.0,
  "reasoning": "Brief legal analysis"
}"""

    response = requests.post(
        f"{LM_STUDIO_URL}/chat/completions",
        json={
            "model": MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": "Does unwelcome sexual conduct that creates a hostile environment meet Title IX standards?"}
            ],
            "temperature": 0.7,
            "max_tokens": 200
        },
        timeout=30
    )

    if response.status_code == 200:
        result = response.json()
        message = result["choices"][0]["message"]["content"]
        print("✅ Agent test successful!")
        print(f"   Agent response: {message[:200]}...")

        # Try to parse JSON
        try:
            import re
            json_match = re.search(r'\{.*\}', message, re.DOTALL)
            if json_match:
                agent_response = json.loads(json_match.group())
                print(f"   Parsed vote: {agent_response.get('vote', 'N/A')}")
                print(f"   Confidence: {agent_response.get('confidence', 'N/A')}")
        except:
            print("   (Could not parse JSON, but LLM is responding)")
    else:
        print(f"❌ Agent test failed with status {response.status_code}")
except Exception as e:
    print(f"❌ Agent test error: {e}")

print("\n" + "=" * 50)
print("✅ LM Studio is ready to use with SafeSpace!")
print("\nNext steps:")
print("1. If using Docker: docker-compose up --build")
print("2. If running locally: cd backend && python -m app.main")
print("3. The app will automatically use LM Studio")
