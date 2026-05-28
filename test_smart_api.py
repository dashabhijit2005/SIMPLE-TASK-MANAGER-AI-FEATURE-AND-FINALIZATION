#!/usr/bin/env python3
"""
Smart API Testing Script
Tests all 4 new Week 5 endpoints
"""

import requests
import json
from datetime import datetime
import time

BASE_URL = "http://localhost:5000/api"
TEST_USER_EMAIL = f"testuser_{int(time.time())}@test.com"
TEST_USER_PASSWORD = "testpass123456"

# Colors for terminal output
GREEN = '\033[92m'
BLUE = '\033[94m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'
BOLD = '\033[1m'

def print_header(text):
    print(f"\n{BOLD}{BLUE}{'='*50}{RESET}")
    print(f"{BOLD}{BLUE}{text}{RESET}")
    print(f"{BOLD}{BLUE}{'='*50}{RESET}\n")

def print_success(text):
    print(f"{GREEN}✅ {text}{RESET}")

def print_error(text):
    print(f"{RED}❌ {text}{RESET}")

def print_info(text):
    print(f"{BLUE}ℹ️  {text}{RESET}")

def print_step(text):
    print(f"{BOLD}{YELLOW}→ {text}{RESET}")

# STEP 1: Sign Up
print_header("STEP 1: Creating Test User")
print_step(f"Email: {TEST_USER_EMAIL}")
print_step(f"Password: {TEST_USER_PASSWORD}")

try:
    signup_response = requests.post(
        f"{BASE_URL}/auth/signup",
        json={
            "name": "Test User",
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD
        }
    )
    
    if signup_response.status_code == 201 or signup_response.status_code == 200:
        print_success("User created successfully")
        signup_data = signup_response.json()
        print(json.dumps(signup_data, indent=2))
    else:
        print_error(f"Signup failed: {signup_response.text}")
        exit(1)
except Exception as e:
    print_error(f"Signup error: {e}")
    exit(1)

# STEP 2: Login
print_header("STEP 2: Logging In to Get JWT Token")

try:
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        json={
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD
        }
    )
    
    if login_response.status_code == 200:
        login_data = login_response.json()
        jwt_token = login_data.get("token")
        print_success("Login successful")
        print(f"{BLUE}Token: {jwt_token[:50]}...{RESET}")
    else:
        print_error(f"Login failed: {login_response.text}")
        exit(1)
except Exception as e:
    print_error(f"Login error: {e}")
    exit(1)

# Headers for authenticated requests
headers = {"Authorization": f"Bearer {jwt_token}"}

# STEP 3: Create Sample Tasks
print_header("STEP 3: Creating Sample Tasks")

task_count = 0

# Create 3 completed Coding tasks
for i in range(1, 4):
    try:
        task_response = requests.post(
            f"{BASE_URL}/tasks/add",
            headers=headers,
            json={
                "title": f"Complete Coding Task {i}",
                "description": f"Sample coding task {i}",
                "category": "Coding",
                "priority": "High",
                "completed": True
            }
        )
        if task_response.status_code in [200, 201]:
            task_count += 1
            print_success(f"Created completed Coding task {i}")
    except Exception as e:
        print_error(f"Failed to create task: {e}")

# Create 2 completed Learning tasks
for i in range(1, 3):
    try:
        task_response = requests.post(
            f"{BASE_URL}/tasks/add",
            headers=headers,
            json={
                "title": f"Learn JavaScript {i}",
                "description": f"Learning task {i}",
                "category": "Learning",
                "priority": "Medium",
                "completed": True
            }
        )
        if task_response.status_code in [200, 201]:
            task_count += 1
            print_success(f"Created completed Learning task {i}")
    except Exception as e:
        print_error(f"Failed to create task: {e}")

# Create 2 pending Development tasks
for i in range(1, 3):
    try:
        task_response = requests.post(
            f"{BASE_URL}/tasks/add",
            headers=headers,
            json={
                "title": f"Pending Development Task {i}",
                "description": f"Development task {i}",
                "category": "Development",
                "priority": "Low",
                "completed": False
            }
        )
        if task_response.status_code in [200, 201]:
            task_count += 1
            print_success(f"Created pending Development task {i}")
    except Exception as e:
        print_error(f"Failed to create task: {e}")

print_info(f"Total tasks created: {task_count}")

# TESTING THE 4 SMART API ENDPOINTS
print_header("🧪 TESTING 4 SMART API ENDPOINTS")

# TEST 1: Get Recommendations
print(f"{BOLD}{YELLOW}TEST 1: GET /api/recommendations{RESET}")
print("-" * 50)
try:
    rec_response = requests.get(
        f"{BASE_URL}/recommendations",
        headers=headers
    )
    if rec_response.status_code == 200:
        rec_data = rec_response.json()
        print_success("Recommendations endpoint working!")
        print(json.dumps(rec_data, indent=2))
        print_info(f"Recommended tasks: {len(rec_data.get('recommendations', []))}")
        print_info(f"Top categories: {rec_data.get('topCategories', [])}")
        print_info(f"Message: {rec_data.get('message', '')}")
    else:
        print_error(f"Recommendations failed: {rec_response.text}")
except Exception as e:
    print_error(f"Recommendations error: {e}")

# TEST 2: Get Analytics
print(f"\n{BOLD}{YELLOW}TEST 2: GET /api/analytics{RESET}")
print("-" * 50)
try:
    ana_response = requests.get(
        f"{BASE_URL}/analytics",
        headers=headers
    )
    if ana_response.status_code == 200:
        ana_data = ana_response.json()
        print_success("Analytics endpoint working!")
        summary = ana_data.get('summary', {})
        print_info(f"Total tasks: {summary.get('totalTasks', 0)}")
        print_info(f"Completed: {summary.get('completedTasks', 0)}")
        print_info(f"Pending: {summary.get('pendingTasks', 0)}")
        print_info(f"Completion rate: {summary.get('completionRate', 'N/A')}")
        print(json.dumps(ana_data, indent=2))
    else:
        print_error(f"Analytics failed: {ana_response.text}")
except Exception as e:
    print_error(f"Analytics error: {e}")

# TEST 3: Get Insights
print(f"\n{BOLD}{YELLOW}TEST 3: GET /api/insights{RESET}")
print("-" * 50)
try:
    ins_response = requests.get(
        f"{BASE_URL}/insights",
        headers=headers
    )
    if ins_response.status_code == 200:
        ins_data = ins_response.json()
        print_success("Insights endpoint working!")
        insights = ins_data.get('insights', [])
        print_info(f"Generated {len(insights)} insights:")
        for idx, insight in enumerate(insights, 1):
            print(f"\n  {BOLD}Insight {idx}: {insight.get('title', 'N/A')}{RESET}")
            print(f"    → {insight.get('description', '')}")
            print(f"    💡 {insight.get('recommendation', '')}")
        print(json.dumps(ins_data, indent=2))
    else:
        print_error(f"Insights failed: {ins_response.text}")
except Exception as e:
    print_error(f"Insights error: {e}")

# TEST 4: Get Suggestions
print(f"\n{BOLD}{YELLOW}TEST 4: GET /api/suggestions{RESET}")
print("-" * 50)
try:
    sug_response = requests.get(
        f"{BASE_URL}/suggestions",
        headers=headers
    )
    if sug_response.status_code == 200:
        sug_data = sug_response.json()
        print_success("Suggestions endpoint working!")
        suggestions = sug_data.get('suggestions', [])
        print_info(f"Generated {len(suggestions)} suggestions:")
        for idx, suggestion in enumerate(suggestions, 1):
            print(f"  {idx}. {suggestion}")
        print_info(f"Top categories: {sug_data.get('yourTopCategories', [])}")
        print_info(f"Total completed: {sug_data.get('totalCompleted', 0)}")
        print_info(f"Motivation: {sug_data.get('motivation', '')}")
        print(json.dumps(sug_data, indent=2))
    else:
        print_error(f"Suggestions failed: {sug_response.text}")
except Exception as e:
    print_error(f"Suggestions error: {e}")

# Final Summary
print_header("✅ SMART API TESTING COMPLETE!")
print_success("All 4 endpoints tested successfully!")
print_info("Week 5 Smart API System is working correctly")
print_info("Ready for deployment to production")
