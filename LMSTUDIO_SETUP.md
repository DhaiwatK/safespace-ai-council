# 🤖 Using LM Studio with SafeSpace AI Council

Your LM Studio is now **properly configured** with the SafeSpace platform!

---

## ✅ Current Setup

**LM Studio Status:** ✅ Running on `localhost:1234`

**Active Model:** `gemma-3-4b-it`

**Configuration:** Updated in `docker-compose.yml` and `backend/.env`

---

## 🚀 How to Run with LM Studio

### Option 1: Docker (Recommended)

```bash
# 1. Make sure LM Studio is running on port 1234
# (You already have this running!)

# 2. Start the app
docker-compose up --build

# 3. Open browser
http://localhost:3000
```

The Docker container will connect to your host's LM Studio via `host.docker.internal:1234`.

### Option 2: Local Development

```bash
# Terminal 1: Backend (will use LM Studio)
cd backend
pip install -r requirements.txt
python -m app.main

# Terminal 2: Frontend
cd Frontend
npm install
npm run dev
```

Open: http://localhost:5173

---

## 🧪 Testing the Connection

### Quick Test

```bash
# Test LM Studio is accessible
curl http://localhost:1234/v1/models

# Should show: gemma-3-4b-it in the list
```

### Test with SafeSpace Backend

Once the backend is running:

```bash
# Check health (shows LLM provider status)
curl http://localhost:8000/api/health

# Should return:
# {
#   "status": "healthy",
#   "llm_provider": "local",
#   "local_llm_available": true
# }
```

### Test AI Analysis

```bash
# Analyze a case (will use your LM Studio)
curl -X POST http://localhost:8000/api/ai/analyze/title-ix/case_001

# This will:
# 1. Send prompts to your LM Studio
# 2. Get 5 agent responses from Gemma-3-4b
# 3. Calculate consensus
# 4. Return the result
```

---

## 🎯 How the Multi-Agent System Uses LM Studio

When you click "Analyze Title IX Jurisdiction" in the UI:

1. **Agent Lex** sends a legal compliance prompt to Gemma-3-4b
2. **Agent Sofia** sends a trauma-informed prompt to Gemma-3-4b
3. **Agent Equity** sends a bias detection prompt to Gemma-3-4b
4. **Agent Holmes** sends an evidence analysis prompt to Gemma-3-4b
5. **Agent Sentinel** sends a risk assessment prompt to Gemma-3-4b

Each agent gets an independent response from your model, then the system calculates consensus!

---

## ⚙️ Configuration Details

### Current Settings (docker-compose.yml)

```yaml
environment:
  - LLM_PROVIDER=local
  - LOCAL_LLM_URL=http://host.docker.internal:1234/v1
  - LOCAL_LLM_MODEL=gemma-3-4b-it
```

### Current Settings (backend/.env)

```bash
LLM_PROVIDER=local
LOCAL_LLM_URL=http://localhost:1234/v1
LOCAL_LLM_MODEL=gemma-3-4b-it
```

---

## 🔄 Switching Between Providers

### Use LM Studio (Current Setup)

```yaml
# docker-compose.yml
environment:
  - LLM_PROVIDER=local
  - LOCAL_LLM_MODEL=gemma-3-4b-it
```

### Use Mock (Instant Demo)

```yaml
# docker-compose.yml
environment:
  - LLM_PROVIDER=mock
```

### Use Anthropic Claude (If You Get API Key)

```yaml
# docker-compose.yml
environment:
  - LLM_PROVIDER=anthropic
  - ANTHROPIC_API_KEY=sk-ant-your-key
```

Then restart:
```bash
docker-compose down
docker-compose up
```

---

## 📊 Expected Performance

### With Gemma-3-4b-it:

**Speed:**
- Each agent analysis: ~2-5 seconds
- Full 5-agent consensus: ~10-25 seconds
- Depends on your hardware

**Quality:**
- Should provide coherent legal/bias/evidence analysis
- May not match Claude's quality, but demonstrates the concept
- JSON parsing might require fallbacks (system handles this)

**Comparison:**
| Provider | Speed | Quality | Cost | Setup |
|----------|-------|---------|------|-------|
| Mock | Instant | Fixed responses | Free | None |
| LM Studio | Slow (~20s) | Good | Free | Requires local GPU/CPU |
| Anthropic | Fast (2-5s) | Excellent | Paid | API key only |

---

## 🐛 Troubleshooting

### "Cannot connect to LM Studio"

**Check 1: Is LM Studio running?**
```bash
curl http://localhost:1234/v1/models
```

**Check 2: Is the model loaded?**
- Open LM Studio
- Make sure "gemma-3-4b-it" is loaded (not just downloaded)
- Check the "Local Server" tab is enabled

**Check 3: Firewall/Permissions**
- LM Studio needs to allow local connections
- Port 1234 should be accessible

### "AI analysis times out"

**Solution 1: Increase timeout**

Edit `backend/app/llm_provider.py`:
```python
timeout=60  # Increase from 30 to 60
```

**Solution 2: Use smaller prompts**

The agents send detailed prompts. For faster responses with smaller models, you could simplify agent prompts.

**Solution 3: Use Mock mode for demo**

If you're presenting and don't want to wait:
```yaml
environment:
  - LLM_PROVIDER=mock
```

### "JSON parsing errors"

This is normal with smaller models. The system has fallback handling:

```python
# If JSON parsing fails, system returns default response
# and flags it for human review
```

---

## 💡 Tips for Best Results

### 1. Keep LM Studio Server Running

Before starting SafeSpace:
- ✅ LM Studio is open
- ✅ Model is loaded (not just downloaded)
- ✅ "Local Server" is enabled
- ✅ Port 1234 is active

### 2. Optimize for Speed

**In LM Studio settings:**
- Use GPU acceleration if available
- Reduce context window if slow
- Enable batching

### 3. Warm Up the Model

Before demo, send a test query:
```bash
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma-3-4b-it",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
  }'
```

This "warms up" the model for faster subsequent requests.

---

## 🎬 Demo Strategy

### For Live Demo with LM Studio:

**Pros:**
- ✅ Show real AI in action
- ✅ No API costs
- ✅ Fully local/private

**Cons:**
- ❌ Slower (10-25 seconds per analysis)
- ❌ Quality may vary
- ❌ Risk of timing out during demo

**Recommendation:**

**During Demo:**
1. Start with Mock mode (instant responses)
2. Show the UI and concept
3. Then switch to LM Studio for one "live" demo
4. Tell audience: "Now let's see it with a real local LLM..."
5. Click analyze and explain the system while waiting

**What to say while waiting:**
> "While the model is analyzing, here's what's happening: Each of our 5 specialized AI agents is independently analyzing this case. Agent Lex is checking Title IX regulations, Sofia is evaluating trauma-informed practices, Equity is detecting bias... this takes about 15-20 seconds with a local model, but would be near-instant with Claude API."

This turns the wait time into a feature explanation!

---

## ✅ Verification Checklist

Before your demo:

- [ ] LM Studio is running
- [ ] Model "gemma-3-4b-it" is loaded
- [ ] `curl http://localhost:1234/v1/models` works
- [ ] `docker-compose.yml` has `LLM_PROVIDER=local`
- [ ] Run `docker-compose up --build` successfully
- [ ] Can login to http://localhost:3000
- [ ] Test one AI analysis (expect 15-25 second wait)
- [ ] Decide: Use LM Studio or Mock for live demo?

---

## 🎉 You're Ready!

Your SafeSpace platform is now connected to your local LM Studio instance.

**What happens when you click "Analyze Title IX Jurisdiction":**

1. ✅ Frontend sends request to backend
2. ✅ Backend routes to AI analysis endpoint
3. ✅ Consensus system calls all 5 agents
4. ✅ Each agent sends prompt to LM Studio (localhost:1234)
5. ✅ Gemma-3-4b generates 5 independent responses
6. ✅ Consensus algorithm calculates weighted vote
7. ✅ Result displayed in UI with full reasoning

**This is real multi-agent AI running on your local machine!** 🚀

---

## 📞 Quick Commands

```bash
# Test LM Studio
curl http://localhost:1234/v1/models

# Start with LM Studio
docker-compose up --build

# Switch to Mock (fast demo)
# Edit docker-compose.yml: LLM_PROVIDER=mock
# Then: docker-compose up --build

# View backend logs (see LLM calls)
docker-compose logs -f safespace-app

# Health check
curl http://localhost:8000/api/health
```

---

Good luck with your demo! 🍀
