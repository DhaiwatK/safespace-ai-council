# 🔄 How to See Your Changes - Complete Guide

## The Problem You're Experiencing

When you change backend Python files (like `mock_data.py`), the changes need to be:
1. **Rebuilt into the Docker image**
2. **Container restarted**
3. **Browser cache cleared**

Missing any step = you won't see changes!

---

## ✅ CORRECT Way to Apply Backend Changes

### Step 1: Stop Container
```bash
docker compose down
```

### Step 2: Rebuild with --build Flag
```bash
docker compose up --build
```

**IMPORTANT:** The `--build` flag is critical! Without it, Docker uses the old cached image.

### Step 3: Wait for Build
Watch for these messages:
```
Building safespace-app
[+] Building 120.5s (18/18) FINISHED
...
✔ Container safespace-ai-council-safespace-app-1  Started
```

This takes **2-3 minutes** the first time.

### Step 4: Clear Browser Cache

**Option A: Hard Refresh**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Option B: Incognito/Private Window**
- Open new incognito window
- Navigate to http://localhost:3000

**Option C: Clear Site Data**
- F12 → Application tab → Clear site data

### Step 5: Verify Changes
```bash
# Test API directly
curl http://localhost:3000/api/cases | python3 -m json.tool | grep "description" | head -3

# Should show the NEW description with "timeline inconsistencies"
```

---

## 🐛 Why Your Changes Weren't Showing

### Issue 1: Not Using --build Flag
```bash
# ❌ WRONG - Uses old cached image
docker compose down
docker compose up

# ✅ CORRECT - Rebuilds with new code
docker compose down
docker compose up --build
```

### Issue 2: Browser Cache
Your browser cached the API response!

**Solution:** Always hard refresh or use incognito after rebuild.

### Issue 3: Trailing Slash Redirect (Fixed!)
The API was redirecting `/api/cases` → `/api/cases/` which confused the browser cache.

I just fixed this by adding both routes.

---

## 🧪 How to Test if Changes Are in Container

### Check 1: File Contents in Container
```bash
# Check if your new mock data is in the container
docker exec safespace-ai-council-safespace-app-1 grep "timeline inconsistencies" /app/app/data/mock_data.py

# Should return a match if rebuild worked
```

### Check 2: API Response
```bash
# Get case data from API
curl -s http://localhost:3000/api/cases | python3 -m json.tool

# Look for the new description in case_001
```

### Check 3: Container Build Time
```bash
# Check when container was built
docker ps | grep safespace

# Look at "CREATED" column - should be recent (e.g., "2 minutes ago")
```

---

## 📝 Different Types of Changes

### Backend Python Changes (.py files)
**What:** `mock_data.py`, `llm_provider.py`, `routes/*.py`, etc.

**How to apply:**
```bash
docker compose down
docker compose up --build  # MUST use --build
```

**Time:** 2-3 minutes (rebuilds Python layer)

### Frontend Changes (.tsx, .ts files)
**What:** `Login.tsx`, `InvestigatorDashboard.tsx`, etc.

**How to apply:**
```bash
docker compose down
docker compose up --build  # MUST use --build
```

**Time:** 3-4 minutes (rebuilds Node layer + Python layer)

### Configuration Changes (docker-compose.yml, .env)
**What:** Environment variables, LLM provider settings

**How to apply:**
```bash
docker compose down
docker compose up  # No --build needed for config only
```

**Time:** 10 seconds

### Static Files Only (images, etc.)
**What:** Favicon, images in public folder

**How to apply:**
```bash
docker compose down
docker compose up --build
```

**Time:** 2-3 minutes

---

## ⚡ Fast Development Workflow

### Option A: Full Docker (Slow but Production-Like)
Every change requires full rebuild (2-3 minutes)

**Best for:** Final testing before demo

### Option B: Local Development (Fast)
Run backend and frontend locally without Docker

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m app.main
# Runs on http://localhost:8000
# Changes apply immediately (Python auto-reloads)
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
# Runs on http://localhost:5173
# Changes apply immediately (Vite hot reload)
```

**Best for:** Rapid iteration during development

**Trade-off:** Requires Python and Node installed locally

---

## 🔄 Complete Rebuild (Nuclear Option)

If nothing else works, do a complete rebuild:

```bash
# Stop everything
docker compose down

# Remove old images
docker rmi safespace-ai-council-safespace-app

# Remove all unused images (careful!)
docker system prune -af

# Rebuild from scratch
docker compose up --build
```

This forces Docker to rebuild everything from scratch.

**Time:** 5-10 minutes (downloads dependencies)

---

## ✅ Step-by-Step: Apply Your Mock Data Changes

### Right Now, Do This:

**Step 1: Stop container**
```bash
docker compose down
```

**Step 2: Rebuild (IMPORTANT: Use --build)**
```bash
docker compose up --build
```

**Step 3: Wait for this message:**
```
✔ Container safespace-ai-council-safespace-app-1  Started
```

**Step 4: Open NEW incognito window**
```
http://localhost:3000
```

**Step 5: Login as Investigator**

**Step 6: Look at case NW-2025-TIX-0147**

**Expected:** Description should say "timeline inconsistencies" and "alibi"

**Step 7: Click "AI Council" → "Analyze Title IX Jurisdiction"**

**Expected:** Should see 4 NO votes, 1 YES vote

---

## 🎯 Quick Reference

| Change Type | Command | Time | Needs Browser Refresh? |
|------------|---------|------|----------------------|
| Python backend | `docker compose up --build` | 2-3 min | Yes (hard refresh) |
| React frontend | `docker compose up --build` | 3-4 min | Yes (hard refresh) |
| docker-compose.yml | `docker compose up` | 10 sec | Maybe |
| .env variables | `docker compose up` | 10 sec | Maybe |

---

## 🐛 Common Issues & Solutions

### "I rebuilt but still see old data"
**Solution:** Clear browser cache (Ctrl+Shift+R or incognito)

### "Changes work in API but not in UI"
**Solution:** Browser cached the API response. Hard refresh.

### "API returns 404"
**Solution:** Routes changed. Restart container: `docker compose restart`

### "Build seems stuck"
**Solution:**
- Docker is downloading dependencies (first time only)
- Or npm install is running (3-4 minutes)
- Check logs: `docker compose logs -f`

### "Container keeps restarting"
**Solution:**
- Check logs: `docker compose logs safespace-app`
- Look for Python errors
- Syntax error in code you changed?

---

## 📊 How to Monitor Changes

### Watch Logs in Real-Time
```bash
# In a separate terminal window
docker compose logs -f

# You'll see:
# - Container startup
# - Python imports
# - API requests
# - Any errors
```

### Check Container Health
```bash
# Is container running?
docker ps | grep safespace

# Check health status
curl http://localhost:3000/api/health
```

### Test Specific Endpoint
```bash
# Test cases endpoint
curl http://localhost:3000/api/cases

# Test patterns endpoint
curl http://localhost:3000/api/ai/patterns/
```

---

## ✅ Your Checklist for Seeing Changes

Before asking "why can't I see my changes":

- [ ] Did I use `docker compose up --build`?
- [ ] Did I wait for "Container Started" message?
- [ ] Did I hard refresh browser (Ctrl+Shift+R)?
- [ ] Or did I open incognito window?
- [ ] Can I see changes via curl API test?
- [ ] Is container actually running? (`docker ps`)
- [ ] Are there errors in logs? (`docker compose logs`)

If all checked and still not working → Try complete rebuild:
```bash
docker compose down
docker system prune -af
docker compose up --build
```

---

## 🎯 TL;DR - Quick Command

**To see ANY backend or frontend changes:**

```bash
docker compose down && docker compose up --build
```

Then hard refresh browser: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)

**That's it!** 🎉

---

Now try it with your mock data changes!
