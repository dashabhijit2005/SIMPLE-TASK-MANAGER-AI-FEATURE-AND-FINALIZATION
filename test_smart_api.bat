@echo off
REM ============ SMART API TESTING SCRIPT FOR WINDOWS ============

setlocal enabledelayedexpansion

set BASE_URL=http://localhost:5000/api
set TEST_USER=testuser_%RANDOM%@test.com
set TEST_PASSWORD=testpass123456

echo.
echo ============================================
echo   SMART API TESTING - Week 5
echo ============================================
echo.

REM STEP 1: Sign Up
echo [STEP 1] Creating test user...
echo Email: %TEST_USER%
curl -s -X POST "%BASE_URL%/auth/signup" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"%TEST_USER%\",\"password\":\"%TEST_PASSWORD%\"}"
echo.
echo.

REM STEP 2: Login and extract token
echo [STEP 2] Logging in to get JWT token...
for /f "tokens=*" %%i in ('curl -s -X POST "%BASE_URL%/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"%TEST_USER%\",\"password\":\"%TEST_PASSWORD%\"}"') do set LOGIN_RESPONSE=%%i

echo Response: %LOGIN_RESPONSE%

REM Try to extract token using a simple method
for /f "tokens=2 delims=:," %%i in ('echo %LOGIN_RESPONSE% ^| findstr "token"') do set JWT_TOKEN=%%i
set JWT_TOKEN=!JWT_TOKEN:"=!

echo Token: !JWT_TOKEN!
echo.
echo.

REM STEP 3: Create Sample Tasks
echo [STEP 3] Creating sample tasks...
echo.

REM Coding tasks (3 completed)
for /L %%i in (1,1,3) do (
  echo Creating Coding Task %%i...
  curl -s -X POST "%BASE_URL%/tasks/add" ^
    -H "Authorization: Bearer !JWT_TOKEN!" ^
    -H "Content-Type: application/json" ^
    -d "{\"title\":\"Complete Coding Task %%i\",\"description\":\"Coding task %%i\",\"category\":\"Coding\",\"priority\":\"High\",\"completed\":true}"
  echo.
)

REM Learning tasks (2 completed)
for /L %%i in (1,1,2) do (
  echo Creating Learning Task %%i...
  curl -s -X POST "%BASE_URL%/tasks/add" ^
    -H "Authorization: Bearer !JWT_TOKEN!" ^
    -H "Content-Type: application/json" ^
    -d "{\"title\":\"Learn JavaScript %%i\",\"description\":\"Learning task %%i\",\"category\":\"Learning\",\"priority\":\"Medium\",\"completed\":true}"
  echo.
)

REM Development tasks (2 pending)
for /L %%i in (1,1,2) do (
  echo Creating Development Task %%i (pending)...
  curl -s -X POST "%BASE_URL%/tasks/add" ^
    -H "Authorization: Bearer !JWT_TOKEN!" ^
    -H "Content-Type: application/json" ^
    -d "{\"title\":\"Pending Development Task %%i\",\"description\":\"Development task %%i\",\"category\":\"Development\",\"priority\":\"Low\",\"completed\":false}"
  echo.
)

echo.
echo ============================================
echo   TESTING 4 SMART API ENDPOINTS
echo ============================================
echo.

REM TEST 1: Recommendations
echo TEST 1: GET /api/recommendations
echo ---------------------------------
curl -s -X GET "%BASE_URL%/recommendations" ^
  -H "Authorization: Bearer !JWT_TOKEN!"
echo.
echo.

REM TEST 2: Analytics
echo TEST 2: GET /api/analytics
echo ---------------------------------
curl -s -X GET "%BASE_URL%/analytics" ^
  -H "Authorization: Bearer !JWT_TOKEN!"
echo.
echo.

REM TEST 3: Insights
echo TEST 3: GET /api/insights
echo ---------------------------------
curl -s -X GET "%BASE_URL%/insights" ^
  -H "Authorization: Bearer !JWT_TOKEN!"
echo.
echo.

REM TEST 4: Suggestions
echo TEST 4: GET /api/suggestions
echo ---------------------------------
curl -s -X GET "%BASE_URL%/suggestions" ^
  -H "Authorization: Bearer !JWT_TOKEN!"
echo.
echo.

echo ============================================
echo   TESTING COMPLETE!
echo ============================================
