# SAFESPACE AI Council

A trauma-informed case management platform for handling Title IX incidents with AI-powered multi-agent consensus analysis.

## Project Structure

```
safespace-ai-council/
├── Frontend/          # React + TypeScript frontend (Lovable)
├── backend/           # FastAPI backend with mock data
│   ├── app/
│   │   ├── data/      # Mock cases and analysis results
│   │   ├── routes/    # API endpoints
│   │   └── main.py    # FastAPI application
│   ├── requirements.txt
│   └── run.sh         # Quick start script
└── README.md
```

## Features

- **Multi-Agent AI Consensus**: 5 specialized AI agents analyze cases independently:
  - **Lex** - Legal Compliance Specialist
  - **Sofia** - Trauma-Informed Specialist
  - **Equity** - Bias Detection Specialist
  - **Holmes** - Evidence Analysis Specialist
  - **Sentinel** - Risk Assessment Specialist

- **Pre-processed Analysis**: Cases 0148 and 0149 have pre-loaded AI analysis results
- **Live Analysis**: Case 0147 requires clicking "Analyze" button to run consensus

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Run the server:
```bash
./run.sh
```

Or manually:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API will be available at http://localhost:8000
API docs at http://localhost:8000/docs

### Frontend Setup

1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## Demo Cases

### Case NW-2025-TIX-0147 (Weak Evidence)
- Timeline inconsistencies
- Requires clicking "Analyze" button
- Agents show **disagreement**: 4 NO votes, 1 YES vote
- Demonstrates how system handles uncertain cases

### Case NW-2025-TIX-0148 (Strong Evidence)
- Sexual assault with strong corroboration
- **Pre-loaded analysis** - shows immediately
- Agents reach **unanimous YES** decision (5/5)
- High confidence (94%)

### Case NW-2025-TIX-0149 (Discrimination)
- Gender-based discrimination with email evidence
- **Pre-loaded analysis** - shows immediately
- Agents reach **unanimous YES** decision (5/5)
- High confidence (88%)

## API Endpoints

### Cases
- `GET /api/cases/` - List all cases
- `GET /api/cases/{case_id}` - Get specific case (includes pre-loaded analysis if available)

### AI Analysis
- `POST /api/ai/consensus` - Run multi-agent consensus analysis
  ```json
  {
    "question": "Does this incident meet Title IX hostile environment standard?",
    "case_data": { ...case object... }
  }
  ```

## How It Works

1. **Click on a case** in the Investigator Dashboard
2. **View case details** and evidence summary
3. **For cases 0148 & 0149**: Analysis results display immediately
4. **For case 0147**: Click "Analyze Title IX Jurisdiction" button
5. **Review consensus**: See overall decision and confidence
6. **Expand individual agents**: Click any agent to see detailed reasoning and citations

## Technologies

### Frontend
- React 18 + TypeScript
- Vite
- shadcn-ui components
- Tailwind CSS
- React Router
- React Query

### Backend
- FastAPI
- Python 3.8+
- Pydantic for data validation
- Mock data system (can be replaced with real database)

## Next Steps

- [ ] Connect to real LLM (Claude API or local LM Studio)
- [ ] Implement database (PostgreSQL/SQLite)
- [ ] Add authentication system
- [ ] Implement evidence upload
- [ ] Add Docker Compose for easy deployment
- [ ] Create complainant intake flow
- [ ] Build admin analytics dashboard

## Development

### Adding New Cases

Edit `backend/app/data/mock_data.py`:

```python
MOCK_CASES.append({
    "id": "0150",
    "case_number": "NW-2025-TIX-0150",
    "category": "Title IX - ...",
    "status": "Intake",
    "priority": "Standard",
    "filed_date": "2025-03-21",
    "description": "...",
    "evidence_count": 5,
    "witness_count": 2
})
```

### Adding Pre-processed Analysis

```python
MOCK_ANALYSIS_RESULTS["0150"] = {
    "question": "...",
    "consensus_decision": "YES",
    "consensus_confidence": 0.92,
    # ... full agent votes ...
}
```

## License

MIT
