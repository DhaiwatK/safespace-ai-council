# 🚀 Quick Start Guide - Fixed Version

## What Was Fixed

1. **API Function Name**: Changed `runConsensus()` to `analyzeCase()`
2. **Field Names Updated**:
   - `consensus_decision` → `decision`
   - `consensus_confidence` → `confidence`
   - `disagreement_flag` → `has_disagreement`
   - `agent_votes` → `agent_breakdown`
3. **Agent Fields Updated**:
   - `agent` → `agent_name`
   - `specialty` → `agent_role`

## How to Run the App

### Step 1: Start the Backend

**Option A: Using Docker (Recommended)**
```bash
# From repo root
docker-compose up --build
```
This starts both frontend and backend together at `http://localhost:3000`

**Option B: Manual Backend Start**
```bash
# From repo root
cd backend
pip install -r requirements.txt
python -m app.main
```
Backend runs on `http://localhost:8000`

### Step 2: Start the Frontend (if not using Docker)

```bash
# From repo root
cd Frontend

# First time only - install dependencies
npm install

# Start dev server
npm run dev
```
Frontend runs on `http://localhost:5173`

**IMPORTANT**: If running manually, make sure `.env` file exists in `Frontend/`:
```bash
cd Frontend
cp .env.development .env
```

## Testing the Fix

1. **Open the app** in your browser:
   - Docker: http://localhost:3000
   - Manual: http://localhost:5173

2. **Login**: Click any role (no password needed)

3. **Go to Investigator Dashboard**: Click "Investigator" portal

4. **Click on a Case**: Click any case card

5. **AI Analysis**:
   - If backend is running → Click "Analyze" button
   - Should see 5 agents with votes and reasoning

## Troubleshooting

### Error: "runConsensus is not a function"
**Cause**: Frontend code wasn't updated or browser cache
**Fix**:
```bash
# Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
# Or rebuild frontend:
cd Frontend
npm run build
```

### Error: "Failed to fetch"
**Cause**: Backend isn't running
**Fix**:
```bash
# Check if backend is running:
curl http://localhost:8000/api/health

# If not, start it:
cd backend
python -m app.main
```

### Cases show but "Analyze" button does nothing
**Cause**: CORS or API URL mismatch
**Fix**: Check `Frontend/.env` has correct API URL:
```
VITE_API_URL=http://localhost:8000
```

## Environment Variables

### Backend (`backend/.env`)
```bash
# Optional - defaults work fine
LLM_PROVIDER=mock          # Use mock for instant responses
# LLM_PROVIDER=local       # Use LM Studio
# LLM_PROVIDER=anthropic   # Use Claude API

# If using LM Studio:
# LOCAL_LLM_URL=http://localhost:1234/v1

# If using Claude API:
# ANTHROPIC_API_KEY=sk-ant-...
```

### Frontend (`Frontend/.env`)
```bash
# For development (manual run)
VITE_API_URL=http://localhost:8000

# For Docker (single container)
# VITE_API_URL=              # Empty = same origin
```

## Verify Everything Works

Run this test script:
```bash
# Test backend health
curl http://localhost:8000/api/health

# Test cases endpoint
curl http://localhost:8000/api/cases

# Test AI analysis
curl -X POST http://localhost:8000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "case_id": "case_001",
    "question": "Does this meet Title IX standard?"
  }'
```

You should see JSON responses with case data and AI analysis!

## What You Should See

1. **Cases List**: 3 cases displayed on Investigator Dashboard
2. **Case Details**: Click a case → see description, evidence count, etc.
3. **AI Analysis**: Click "Analyze" → see 5 agents with votes (YES/NO), confidence %, and detailed reasoning
4. **Expand Agents**: Click any agent card → see full reasoning and citations

## Demo Cases

- **case_001 (NW-2025-TIX-0147)**: Weak evidence - should show mixed votes
- **case_002 (NW-2025-TIX-0148)**: Strong case - should show unanimous YES
- **case_003 (NW-2025-DIS-0089)**: Discrimination case

All cases have realistic mock data with proper AI agent responses!
