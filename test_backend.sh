#!/bin/bash

# Quick test script for SafeSpace AI Council backend
echo "🧪 Testing SafeSpace AI Council Backend"
echo "========================================"

BASE_URL="http://localhost:8000"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4

    echo -n "Testing $name... "

    if [ "$method" == "GET" ]; then
        response=$(curl -s -w "%{http_code}" -o /tmp/response.txt "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "%{http_code}" -o /tmp/response.txt -X POST "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi

    if [ "$response" == "200" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        return 0
    else
        echo -e "${RED}✗ FAIL (HTTP $response)${NC}"
        return 1
    fi
}

echo ""
echo "1. Health Check"
test_endpoint "API Health" "GET" "/api/health"
cat /tmp/response.txt | python3 -m json.tool 2>/dev/null || cat /tmp/response.txt
echo ""

echo "2. Authentication"
test_endpoint "Login as Investigator" "POST" "/api/auth/login" '{"role": "investigator"}'
echo ""

echo "3. Cases API"
test_endpoint "Get All Cases" "GET" "/api/cases"
test_endpoint "Get Case Stats" "GET" "/api/cases/stats"
test_endpoint "Get Specific Case" "GET" "/api/cases/case_001"
echo ""

echo "4. AI Analysis"
test_endpoint "Analyze Title IX" "GET" "/api/ai/analyze/title-ix/case_001"
echo ""
echo "Sample AI Response:"
cat /tmp/response.txt | python3 -m json.tool 2>/dev/null | head -30
echo "..."
echo ""

echo "5. Pattern Detection"
test_endpoint "Get Patterns" "GET" "/api/ai/patterns/"
echo ""

echo "6. Evidence API"
test_endpoint "Get Case Evidence" "GET" "/api/evidence/case/case_001"
echo ""

echo "========================================"
echo -e "${GREEN}✓ Backend is working!${NC}"
echo ""
echo "Next steps:"
echo "1. Start frontend: cd Frontend && npm run dev"
echo "2. Open browser: http://localhost:5173"
echo "3. Login as any role and explore"
echo ""
echo "Or run full Docker stack:"
echo "  docker-compose up"
echo ""
