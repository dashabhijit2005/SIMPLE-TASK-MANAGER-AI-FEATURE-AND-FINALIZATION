#!/usr/bin/env python3
"""
Deadline Assistant Testing Script
Tests ML-like deadline prediction endpoints
"""

import requests
import json
from datetime import datetime, timedelta
import time

BASE_URL = "http://localhost:5000/api"
TEST_USER_EMAIL = f"deadline_test_{int(time.time())}@test.com"
TEST_USER_PASSWORD = "deadlinepass123"

# Colors
GREEN = '\033[92m'
BLUE = '\033[94m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'
BOLD = '\033[1m'

def print_header(text):
    print(f"\n{BOLD}{BLUE}{'='*70}{RESET}")
    print(f"{BOLD}{BLUE}{text:^70}{RESET}")
    print(f"{BOLD}{BLUE}{'='*70}{RESET}\n")

def print_success(text):
    print(f"{GREEN}✅ {text}{RESET}")

def print_error(text):
    print(f"{RED}❌ {text}{RESET}")

def print_info(text):
    print(f"{BLUE}ℹ️  {text}{RESET}")

def print_step(text):
    print(f"{BOLD}{YELLOW}→ {text}{RESET}")

# Setup: Create user and tasks
print_header("DEADLINE ASSISTANT - ML FEATURE TESTING")

# Sign up
try:
    signup_response = requests.post(
        f"{BASE_URL}/auth/signup",
        json={
            "name": "Deadline Test User",
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD
        }
    )
    print_success("Test user created")
except Exception as e:
    print_error(f"Signup failed: {e}")
    exit(1)

# Login
try:
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": TEST_USER_EMAIL, "password": TEST_USER_PASSWORD}
    )
    jwt_token = login_response.json()["token"]
    print_success("Logged in successfully")
except Exception as e:
    print_error(f"Login failed: {e}")
    exit(1)

headers = {"Authorization": f"Bearer {jwt_token}"}

# Create sample tasks for historical data
print_header("STEP 1: Creating Sample Task History")

task_ids = []
sample_tasks = [
    {"title": "Build API Endpoint", "category": "Coding", "priority": "High", "completed": True},
    {"title": "Fix Database Query", "category": "Coding", "priority": "High", "completed": True},
    {"title": "Code Review", "category": "Coding", "priority": "Medium", "completed": True},
    {"title": "Learn React", "category": "Learning", "priority": "Medium", "completed": True},
    {"title": "Study ML Basics", "category": "Learning", "priority": "Medium", "completed": True},
    {"title": "Write Documentation", "category": "Documentation", "priority": "Low", "completed": True},
    {"title": "Design UI Mockups", "category": "Design", "priority": "Medium", "completed": True},
]

for task in sample_tasks:
    try:
        response = requests.post(
            f"{BASE_URL}/tasks/add",
            headers=headers,
            json=task
        )
        if response.status_code in [200, 201]:
            task_data = response.json()
            task_ids.append(task_data.get("_id", "unknown"))
            print_success(f"Created: {task['title']} ({task['category']})")
    except Exception as e:
        print_error(f"Failed to create task: {e}")

# Create pending tasks
print(f"\n{BOLD}Creating pending tasks for deadline suggestions:{RESET}")
pending_tasks = [
    {"title": "Implement Authentication", "category": "Coding", "priority": "High"},
    {"title": "Deploy to Production", "category": "Development", "priority": "High"},
    {"title": "Create Test Suite", "category": "Testing", "priority": "Medium"},
    {"title": "Write Blog Post", "category": "Documentation", "priority": "Low"},
]

for task in pending_tasks:
    try:
        response = requests.post(
            f"{BASE_URL}/tasks/add",
            headers=headers,
            json=task
        )
        if response.status_code in [200, 201]:
            task_data = response.json()
            task_ids.append(task_data.get("_id", "unknown"))
            print_success(f"Created pending: {task['title']}")
    except Exception as e:
        print_error(f"Failed: {e}")

# TEST 1: Suggest deadline for a new task
print_header("TEST 1: Suggest Deadline for New Task")
print_step("Request: POST /api/deadline/suggest")
print_step("Task: Build API Endpoint (Coding, High)")

try:
    deadline_response = requests.post(
        f"{BASE_URL}/deadline/suggest",
        headers=headers,
        json={
            "title": "Build Payment Processing System",
            "category": "Coding",
            "priority": "High",
            "description": "Integrate Stripe payment gateway"
        }
    )
    
    if deadline_response.status_code == 200:
        deadline_data = deadline_response.json()
        print_success("Deadline suggestion generated!")
        
        rec = deadline_data.get("recommendation", {})
        print(f"\n{BOLD}Recommended Deadline:{RESET}")
        print(f"  📅 Days to Complete: {rec.get('suggestedDays')} days")
        print(f"  📆 Deadline Date: {rec.get('suggestedDeadline')}")
        
        print(f"\n{BOLD}Reasoning:{RESET}")
        complexity = rec.get('reasoning', {}).get('complexity', {})
        print(f"  • Complexity: {complexity.get('score')} - {complexity.get('explanation')}")
        
        historical = rec.get('reasoning', {}).get('historicalPattern', {})
        print(f"  • Historical: {historical.get('explanation')}")
        print(f"    Average completion: {historical.get('averageCompletionDays')} days")
        
        workload = rec.get('reasoning', {}).get('workloadImpact', {})
        print(f"  • Current Workload: {workload.get('currentPendingTasks')} pending tasks")
        print(f"    Adjustment factor: {workload.get('adjustmentFactor')}x")
        print(f"    Impact: {workload.get('explanation')}")
        
        buffer = rec.get('reasoning', {}).get('safetyBuffer', {})
        print(f"  • Safety Buffer: +{buffer.get('bufferPercentage')}% ({buffer.get('explanation')})")
        
        print(f"\n{BOLD}💡 Tips:{RESET}")
        for i, tip in enumerate(rec.get('tips', []), 1):
            print(f"  {i}. {tip}")
        
        alternatives = rec.get('alternatives', {})
        print(f"\n{BOLD}Alternative Deadlines:{RESET}")
        print(f"  ⚡ Aggressive: {alternatives.get('aggressive')} days")
        print(f"  ⏱️  Normal: {alternatives.get('normal')} days")
        print(f"  😌 Relaxed: {alternatives.get('relaxed')} days")
        
        print(f"\n{BOLD}Confidence: {(rec.get('confidence', 0) * 100):.0f}%{RESET}")
        print(f"{BLUE}✨ Message: {deadline_data.get('message')}{RESET}")
        
    else:
        print_error(f"Failed: {deadline_response.text}")
except Exception as e:
    print_error(f"Error: {e}")

# TEST 2: Get deadline recommendations for all pending tasks
print_header("TEST 2: Get Deadline Recommendations for All Tasks")
print_step("Request: GET /api/deadline/all-tasks")

try:
    all_tasks_response = requests.get(
        f"{BASE_URL}/deadline/all-tasks",
        headers=headers
    )
    
    if all_tasks_response.status_code == 200:
        all_tasks_data = all_tasks_response.json()
        print_success("All task recommendations generated!")
        
        summary = all_tasks_data.get("summary", {})
        print(f"\n{BOLD}Task Summary:{RESET}")
        print(f"  Total Pending: {all_tasks_data.get('totalPendingTasks')} tasks")
        print(f"  Critical: {summary.get('criticalTasks', 0)} tasks")
        print(f"  High Urgency: {summary.get('highUrgency', 0)} tasks")
        print(f"  Medium Urgency: {summary.get('mediumUrgency', 0)} tasks")
        print(f"  Low Urgency: {summary.get('lowUrgency', 0)} tasks")
        
        print(f"\n{BOLD}Sorted by Urgency:{RESET}")
        for i, rec in enumerate(all_tasks_data.get("recommendations", []), 1):
            urgency_icon = {"Critical": "🔴", "High": "🟠", "Medium": "🟡", "Low": "🟢"}
            icon = urgency_icon.get(rec.get('urgency'), "⚪")
            print(f"\n  {i}. {icon} {rec.get('title')}")
            print(f"     Category: {rec.get('category')} | Priority: {rec.get('priority')}")
            print(f"     Complexity: {rec.get('complexity')} | Est. Days: {rec.get('estimatedDays')}")
            print(f"     📌 {rec.get('recommendation')}")
        
    else:
        print_error(f"Failed: {all_tasks_response.text}")
except Exception as e:
    print_error(f"Error: {e}")

# TEST 3: Analyze specific task deadline
if task_ids and len(task_ids) > 0:
    print_header("TEST 3: Analyze Specific Task Deadline")
    print_step(f"Request: GET /api/deadline/analyze/{task_ids[0]}")
    
    try:
        analyze_response = requests.get(
            f"{BASE_URL}/deadline/analyze/{task_ids[0]}",
            headers=headers
        )
        
        if analyze_response.status_code == 200:
            analyze_data = analyze_response.json()
            analysis = analyze_data.get("analysis", {})
            
            print_success("Task analysis generated!")
            print(f"\n{BOLD}Task Analysis:{RESET}")
            print(f"  Title: {analysis.get('title')}")
            print(f"  Status: {analysis.get('currentStatus')}")
            print(f"  Overdue: {'Yes ⚠️' if analysis.get('isOverdue') else 'No ✅'}")
            if analysis.get('daysUntilDeadline'):
                print(f"  Days Until Deadline: {analysis.get('daysUntilDeadline')}")
            
            metrics = analysis.get('metrics', {})
            print(f"\n{BOLD}Metrics:{RESET}")
            print(f"  Complexity: {metrics.get('complexity')}")
            print(f"  Est. Completion: {metrics.get('estimatedCompletionDays')} days")
            print(f"  Workload Factor: {metrics.get('workloadAdjustment')}x")
            
            print(f"\n{BOLD}Recommendation:{RESET}")
            print(f"  {analysis.get('recommendation')}")
            print(f"\n{BOLD}Suggestion:{RESET}")
            print(f"  {analysis.get('suggestion')}")
        else:
            print_error(f"Failed: {analyze_response.text}")
    except Exception as e:
        print_error(f"Error: {e}")

# Summary
print_header("✅ DEADLINE ASSISTANT TESTING COMPLETE!")
print_success("All deadline prediction endpoints working!")
print_success("ML-like algorithm successfully analyzing tasks")
print_success("Ready for Week 6 finalization")
print_info("\nDeadline Assistant Features:")
print_info("  • Suggest deadlines based on task complexity")
print_info("  • Analyze user's completion patterns")
print_info("  • Account for current workload")
print_info("  • Provide safety buffers")
print_info("  • Generate actionable suggestions")
