#!/bin/bash

# ============ SMART API TESTING SCRIPT ============
# This script tests all 4 new Smart API endpoints

BASE_URL="http://localhost:5000/api"
TIMESTAMP=$(date +%s%N)
TEST_USER="testuser_$TIMESTAMP@test.com"
TEST_PASSWORD="testpass123456"

echo "🚀 SMART API TESTING SCRIPT"
echo "=================================="
echo ""

# STEP 1: Sign Up Test User
echo "📝 STEP 1: Creating test user..."
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User\",
    \"email\": \"$TEST_USER\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "Signup Response: $SIGNUP_RESPONSE"
echo ""

# STEP 2: Login to get JWT Token
echo "🔑 STEP 2: Logging in to get JWT token..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_USER\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "Login Response: $LOGIN_RESPONSE"

# Extract JWT token (adjust based on actual response format)
JWT_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$JWT_TOKEN" ]; then
  echo "❌ Failed to get JWT token. Exiting..."
  exit 1
fi

echo "✅ JWT Token obtained: ${JWT_TOKEN:0:20}..."
echo ""

# STEP 3: Create Sample Tasks
echo "✏️ STEP 3: Creating sample tasks..."

# Create 3 completed Coding tasks
for i in {1..3}; do
  curl -s -X POST "$BASE_URL/tasks/add" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Complete Coding Task $i\",
      \"description\": \"Sample coding task $i\",
      \"category\": \"Coding\",
      \"priority\": \"High\",
      \"completed\": true
    }" > /dev/null
  echo "  ✅ Created completed Coding task $i"
done

# Create 2 completed Learning tasks
for i in {1..2}; do
  curl -s -X POST "$BASE_URL/tasks/add" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Learn JavaScript $i\",
      \"description\": \"Learning task $i\",
      \"category\": \"Learning\",
      \"priority\": \"Medium\",
      \"completed\": true
    }" > /dev/null
  echo "  ✅ Created completed Learning task $i"
done

# Create 2 pending tasks
for i in {1..2}; do
  curl -s -X POST "$BASE_URL/tasks/add" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Pending Development Task $i\",
      \"description\": \"Pending task $i\",
      \"category\": \"Development\",
      \"priority\": \"Low\",
      \"completed\": false
    }" > /dev/null
  echo "  ✅ Created pending Development task $i"
done

echo ""
echo "=================================="
echo "🧪 TESTING 4 SMART API ENDPOINTS"
echo "=================================="
echo ""

# TEST 1: Get Recommendations
echo "1️⃣  TEST: GET /api/recommendations"
echo "-----------------------------------"
RECOMMENDATIONS=$(curl -s -X GET "$BASE_URL/recommendations" \
  -H "Authorization: Bearer $JWT_TOKEN")
echo "$RECOMMENDATIONS" | python -m json.tool 2>/dev/null || echo "$RECOMMENDATIONS"
echo ""

# TEST 2: Get Analytics
echo "2️⃣  TEST: GET /api/analytics"
echo "-----------------------------------"
ANALYTICS=$(curl -s -X GET "$BASE_URL/analytics" \
  -H "Authorization: Bearer $JWT_TOKEN")
echo "$ANALYTICS" | python -m json.tool 2>/dev/null || echo "$ANALYTICS"
echo ""

# TEST 3: Get Insights
echo "3️⃣  TEST: GET /api/insights"
echo "-----------------------------------"
INSIGHTS=$(curl -s -X GET "$BASE_URL/insights" \
  -H "Authorization: Bearer $JWT_TOKEN")
echo "$INSIGHTS" | python -m json.tool 2>/dev/null || echo "$INSIGHTS"
echo ""

# TEST 4: Get Suggestions
echo "4️⃣  TEST: GET /api/suggestions"
echo "-----------------------------------"
SUGGESTIONS=$(curl -s -X GET "$BASE_URL/suggestions" \
  -H "Authorization: Bearer $JWT_TOKEN")
echo "$SUGGESTIONS" | python -m json.tool 2>/dev/null || echo "$SUGGESTIONS"
echo ""

echo "=================================="
echo "✅ TESTING COMPLETE!"
echo "=================================="
