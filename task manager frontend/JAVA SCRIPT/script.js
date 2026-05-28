// API Configuration
const API_BASE_URL = "https://task-manager-backend-pi-two.vercel.app/api";

// ============ AI SUGGESTION DATABASE ============
const aiSuggestions = {
  // Education & Learning
  study: {
    suggestions: [
      "Study for 2 hours",
      "Study chapter 5",
      "Complete assignments",
      "Review notes",
      "Practice problems",
      "Prepare for exam",
      "Read textbook"
    ],
    category: "Education",
    priority: "High"
  },
  learn: {
    suggestions: [
      "Learn new topic",
      "Take online course",
      "Watch tutorial",
      "Practice new skill",
      "Read article",
      "Research topic",
      "Complete lesson"
    ],
    category: "Learning",
    priority: "High"
  },
  code: {
    suggestions: [
      "Write code",
      "Fix bugs",
      "Code review",
      "Debug issue",
      "Test code",
      "Refactor code",
      "Deploy application"
    ],
    category: "Work",
    priority: "High"
  },
  
  // Fitness & Health
  gym: {
    suggestions: [
      "Gym session - 1 hour",
      "Cardio workout",
      "Strength training",
      "Yoga class",
      "Swimming",
      "Weight lifting",
      "Personal training"
    ],
    category: "Fitness",
    priority: "High"
  },
  workout: {
    suggestions: [
      "Home workout - 30 mins",
      "Morning run",
      "Weight training",
      "Stretching routine",
      "HIIT training",
      "Pilates session",
      "Boxing practice"
    ],
    category: "Fitness",
    priority: "Medium"
  },
  exercise: {
    suggestions: [
      "30 min exercise",
      "Jogging",
      "Cycling",
      "Swimming",
      "Dance workout",
      "Martial arts",
      "Sport practice"
    ],
    category: "Fitness",
    priority: "Medium"
  },
  health: {
    suggestions: [
      "Doctor appointment",
      "Health checkup",
      "Take medicine",
      "Medical test",
      "Therapy session",
      "Mental health check",
      "Dentist appointment"
    ],
    category: "Health",
    priority: "High"
  },
  
  // Work & Professional
  meeting: {
    suggestions: [
      "Team meeting - 30 mins",
      "Client call",
      "Standup meeting",
      "Review meeting",
      "Planning session",
      "Brainstorm session",
      "One-on-one meeting"
    ],
    category: "Work",
    priority: "High"
  },
  project: {
    suggestions: [
      "Work on project",
      "Update project status",
      "Project planning",
      "Project review",
      "Complete project",
      "Present project",
      "Submit deliverable"
    ],
    category: "Work",
    priority: "High"
  },
  presentation: {
    suggestions: [
      "Prepare presentation",
      "Create slides",
      "Practice speech",
      "Record presentation",
      "Present to team",
      "Client presentation",
      "Rehearse talk"
    ],
    category: "Work",
    priority: "High"
  },
  call: {
    suggestions: [
      "Call mom",
      "Team call",
      "Client call",
      "Check-in call",
      "Conference call",
      "Sync meeting",
      "Call support"
    ],
    category: "Communication",
    priority: "Medium"
  },
  email: {
    suggestions: [
      "Send important emails",
      "Reply to emails",
      "Check inbox",
      "Client emails",
      "Report emails",
      "Follow-up email",
      "Newsletter email"
    ],
    category: "Work",
    priority: "Medium"
  },
  review: {
    suggestions: [
      "Code review",
      "Document review",
      "Performance review",
      "Project review",
      "Quality check",
      "Final review",
      "Peer review"
    ],
    category: "Work",
    priority: "High"
  },
  
  // Home & Personal
  cooking: {
    suggestions: [
      "Prepare lunch",
      "Cook dinner",
      "Meal prep",
      "Baking",
      "Try new recipe",
      "Cook breakfast",
      "Food preparation"
    ],
    category: "Personal",
    priority: "Medium"
  },
  cleaning: {
    suggestions: [
      "Clean room",
      "Wash dishes",
      "Vacuum floor",
      "Clean kitchen",
      "Bathroom cleaning",
      "Organize closet",
      "Deep cleaning"
    ],
    category: "Personal",
    priority: "Medium"
  },
  shopping: {
    suggestions: [
      "Grocery shopping",
      "Buy groceries",
      "Shop for clothes",
      "Hardware shopping",
      "Online shopping",
      "Buy supplies",
      "Market shopping"
    ],
    category: "Personal",
    priority: "Medium"
  },
  laundry: {
    suggestions: [
      "Wash clothes",
      "Do laundry",
      "Iron clothes",
      "Fold laundry",
      "Dry cleaning drop-off",
      "Organize wardrobe",
      "Sort clothes"
    ],
    category: "Personal",
    priority: "Low"
  },
  
  // Relaxation & Free Time
  break: {
    suggestions: [
      "Coffee break - 15 mins",
      "Lunch break - 1 hour",
      "Short break",
      "Rest time",
      "Relaxation time",
      "Power nap",
      "Meditation break"
    ],
    category: "Personal",
    priority: "Low"
  },
  read: {
    suggestions: [
      "Read book chapter",
      "Read article",
      "Reading time - 30 mins",
      "Read documentation",
      "Read news",
      "Read novel",
      "Read blog post"
    ],
    category: "Learning",
    priority: "Medium"
  },
  creative: {
    suggestions: [
      "Brainstorm ideas",
      "Write content",
      "Design mockup",
      "Create art",
      "Write story",
      "Make music",
      "Creative project"
    ],
    category: "Creative",
    priority: "Medium"
  },
  travel: {
    suggestions: [
      "Plan trip",
      "Book tickets",
      "Pack luggage",
      "Check weather",
      "Arrange transport",
      "Plan itinerary",
      "Travel preparation"
    ],
    category: "Personal",
    priority: "Medium"
  },
  
  // Social & Events
  friend: {
    suggestions: [
      "Call friend",
      "Meet friend",
      "Friend hangout",
      "Video call friend",
      "Send message",
      "Friend's birthday",
      "Plan meetup"
    ],
    category: "Social",
    priority: "Medium"
  },
  family: {
    suggestions: [
      "Family call",
      "Family dinner",
      "Family time",
      "Visit family",
      "Family meeting",
      "Help family",
      "Family event"
    ],
    category: "Social",
    priority: "Medium"
  },
  event: {
    suggestions: [
      "Plan event",
      "Organize event",
      "Attend event",
      "Event setup",
      "Event preparation",
      "Send invitations",
      "Event follow-up"
    ],
    category: "Social",
    priority: "Medium"
  },
  
  // General/Development
  debug: {
    suggestions: [
      "Debug code",
      "Fix bug",
      "Test functionality",
      "Error handling",
      "Performance check",
      "Fix issue",
      "Troubleshoot problem"
    ],
    category: "Work",
    priority: "High"
  },
  test: {
    suggestions: [
      "Run tests",
      "Unit testing",
      "Integration test",
      "Quality assurance",
      "Test cases",
      "Regression testing",
      "Performance testing"
    ],
    category: "Work",
    priority: "High"
  },
  documentation: {
    suggestions: [
      "Write documentation",
      "Update docs",
      "Create README",
      "API documentation",
      "User guide",
      "Technical writing",
      "Write comments"
    ],
    category: "Work",
    priority: "Medium"
  },
  meditation: {
    suggestions: [
      "Meditation - 10 mins",
      "Mindfulness practice",
      "Breathing exercise",
      "Yoga meditation",
      "Calm session",
      "Stress relief",
      "Mental wellness"
    ],
    category: "Health",
    priority: "Low"
  }
};

// ============ AUTH FUNCTIONS ============

// SIGNUP
async function signup() {
  try {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!name || !email || !password) {
      return alert("All fields required!");
    }

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return alert(data.message || "Signup failed!");
    }

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Signup error:", error);
    alert("Signup failed!");
  }
}

// LOGIN
async function login() {
  try {
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
      return alert("Email and password required!");
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return alert(data.message || "Login failed!");
    }

    // Store JWT token
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", email);

    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed!");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}

// ============ AI SUGGESTION FUNCTIONS ============

// SHOW AI SUGGESTIONS
function showAISuggestions() {
  const taskInput = document.getElementById("taskInput");
  const suggestionPanel = document.getElementById("suggestionPanel");
  const suggestionList = document.getElementById("suggestionList");
  
  const inputValue = taskInput?.value?.toLowerCase().trim();
  
  if (!inputValue) {
    suggestionPanel.classList.add("hidden");
    return;
  }

  // Find matching suggestions with relevance scoring
  let bestMatch = null;
  let highestScore = 0;
  
  for (const keyword in aiSuggestions) {
    let score = 0;
    
    // Exact match gets highest score
    if (inputValue === keyword) {
      score = 1000;
    }
    // Word starts with keyword
    else if (inputValue.startsWith(keyword)) {
      score = 500;
    }
    // Keyword is in input
    else if (inputValue.includes(keyword)) {
      score = 300;
    }
    // Keyword starts with input (partial match)
    else if (keyword.startsWith(inputValue)) {
      score = 200;
    }
    // Keyword contains input (fuzzy match)
    else if (keyword.includes(inputValue.substring(0, 3))) {
      score = 100;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = keyword;
    }
  }

  if (!bestMatch || highestScore === 0) {
    suggestionPanel.classList.add("hidden");
    return;
  }

  const suggestionData = aiSuggestions[bestMatch];
  
  // Display suggestions
  suggestionList.innerHTML = "";
  suggestionData.suggestions.slice(0, 5).forEach((suggestion, index) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerHTML = `
      <span class="suggestion-number">${index + 1}</span>
      <span class="suggestion-text">${suggestion}</span>
      <span class="suggestion-meta">
        <span class="suggestion-category">${suggestionData.category}</span>
        <span class="suggestion-priority">${suggestionData.priority}</span>
      </span>
    `;
    div.onclick = () => applySuggestion(suggestion);
    suggestionList.appendChild(div);
  });

  suggestionPanel.classList.remove("hidden");
}

// APPLY SUGGESTION
function applySuggestion(suggestion) {
  const taskInput = document.getElementById("taskInput");
  const suggestionPanel = document.getElementById("suggestionPanel");
  
  taskInput.value = suggestion;
  suggestionPanel.classList.add("hidden");
  
  // Auto-focus on add button
  document.querySelector('.task-form button').focus();
}

// ============ NEW FEATURES ============

// GET TASK STATISTICS
function getTaskStats(tasks) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    byCategory: {},
    byPriority: {}
  };
  
  tasks.forEach(task => {
    // Count by category
    stats.byCategory[task.category] = (stats.byCategory[task.category] || 0) + 1;
    // Count by priority
    stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
  });
  
  return stats;
}

// SHOW TASK ANALYTICS
function showTaskAnalytics(tasks) {
  const stats = getTaskStats(tasks);
  let analyticsHTML = `
    <div class="analytics-panel">
      <h3>📊 Your Statistics</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Tasks</div>
          <div class="stat-value">${stats.total}</div>
        </div>
        <div class="stat-card completed">
          <div class="stat-label">Completed</div>
          <div class="stat-value">${stats.completed}</div>
        </div>
        <div class="stat-card pending">
          <div class="stat-label">Pending</div>
          <div class="stat-value">${stats.pending}</div>
        </div>
      </div>
  `;
  
  if (stats.total > 0) {
    const completionRate = Math.round((stats.completed / stats.total) * 100);
    analyticsHTML += `
      <div class="progress-section">
        <div class="progress-label">Completion Rate: ${completionRate}%</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${completionRate}%"></div>
        </div>
      </div>
    `;
  }
  
  analyticsHTML += `</div>`;
  
  return analyticsHTML;
}

// GET TIME-BASED SUGGESTIONS
function getTimeBasedSuggestion() {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Good Morning! 🌅 How about some study or exercise?";
  } else if (hour < 17) {
    return "Good Afternoon! 🌤️ Time for some productive work?";
  } else if (hour < 21) {
    return "Good Evening! 🌆 Don't forget your projects!";
  } else {
    return "Good Night! 🌙 Time to relax and plan tomorrow?";
  }
}

// SORT TASKS BY CATEGORY
function sortTasksByCategory(tasks) {
  const sorted = {};
  tasks.forEach(task => {
    if (!sorted[task.category]) {
      sorted[task.category] = [];
    }
    sorted[task.category].push(task);
  });
  return sorted;
}

// GET MOST PRODUCTIVE CATEGORY
function getMostProductiveCategory(tasks) {
  const stats = getTaskStats(tasks);
  
  if (Object.keys(stats.byCategory).length === 0) {
    return "No categories yet";
  }
  
  const mostCommon = Object.entries(stats.byCategory).sort(([,a], [,b]) => b - a)[0];
  return `Your most common category: ${mostCommon[0]} (${mostCommon[1]} tasks)`;
}

// SEARCH TASKS
function searchTasks(tasks, searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return tasks;
  
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    task.category.toLowerCase().includes(term) ||
    task.description.toLowerCase().includes(term)
  );
}

// ============ TASK FUNCTIONS ============

// GET AUTHORIZATION HEADER
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// CHECK IF USER IS AUTHENTICATED
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// DISPLAY WELCOME MESSAGE
function displayWelcome() {
  const email = localStorage.getItem("userEmail");
  const welcomeElement = document.getElementById("welcomeUser");
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome, ${email}`;
  }
}

// ADD TASK
async function addTask() {
  try {
    if (!checkAuth()) return;

    const taskInput = document.getElementById("taskInput");
    const title = taskInput?.value?.trim();

    if (!title) {
      return alert("Please enter a task!");
    }

    const response = await fetch(`${API_BASE_URL}/tasks/add`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({
        title,
        description: "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return alert(data.error || "Failed to add task!");
    }

    taskInput.value = "";
    document.getElementById("suggestionPanel").classList.add("hidden");
    loadTasks();
  } catch (error) {
    console.error("Add task error:", error);
    alert("Failed to add task!");
  }
}

// LOAD TASKS
async function loadTasks(filter = "all") {
  try {
    if (!checkAuth()) return;

    const response = await fetch(`${API_BASE_URL}/tasks/get`, {
      method: "GET",
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    let tasks = await response.json();
    
    // Apply search filter if search term exists
    if (currentSearchTerm) {
      tasks = searchTasks(tasks, currentSearchTerm);
    }
    
    displayTasks(tasks, filter);
  } catch (error) {
    console.error("Load tasks error:", error);
    alert("Failed to load tasks!");
  }
}

// DISPLAY TASKS
function displayTasks(tasks, filter = "all") {
  const taskList = document.getElementById("taskList");
  const taskCounter = document.getElementById("taskCounter");

  if (!taskList) return;

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  // Sort by priority (High > Medium > Low)
  const priorityOrder = { "High": 0, "Medium": 1, "Low": 2 };
  filteredTasks.sort((a, b) => {
    const priorityDiff = (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999);
    if (priorityDiff !== 0) return priorityDiff;
    // Then sort by completion status (pending first)
    return a.completed - b.completed;
  });

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<li class='no-tasks'>No tasks found. Create one! 🚀</li>";
    if (taskCounter) taskCounter.textContent = "Tasks: 0";
    return;
  }

  // Group by category
  let currentCategory = "";
  filteredTasks.forEach((task) => {
    // Add category header if different
    if (task.category !== currentCategory) {
      currentCategory = task.category;
      const categoryHeader = document.createElement("li");
      categoryHeader.className = "category-header";
      categoryHeader.textContent = `📁 ${currentCategory}`;
      taskList.appendChild(categoryHeader);
    }

    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""} priority-${task.priority.toLowerCase()}`;
    
    // Priority indicator
    let priorityEmoji = "🔵";
    if (task.priority === "High") priorityEmoji = "🔴";
    else if (task.priority === "Low") priorityEmoji = "🟢";
    
    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" ${task.completed ? "checked" : ""} 
               onchange="toggleTask('${task._id}')">
        <span class="priority-indicator">${priorityEmoji}</span>
        <span class="task-title">${task.title}</span>
        <span class="task-category">${task.category}</span>
        <span class="task-priority">${task.priority}</span>
      </div>
      <div class="task-actions">
        <button onclick="editTask('${task._id}', '${task.title.replace(/'/g, "\\'")}', '${(task.description || '').replace(/'/g, "\\'")}', '${task.category}', '${task.priority}')" class="edit-btn">✏️</button>
        <button onclick="deleteTask('${task._id}')" class="delete-btn">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  if (taskCounter) {
    const completionRate = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) || 0;
    taskCounter.innerHTML = `
      <span class="counter-text">Tasks: ${filteredTasks.length} / ${tasks.length} | Completion: ${completionRate}%</span>
      <span class="most-productive">${getMostProductiveCategory(tasks)}</span>
    `;
  }
}

// TOGGLE TASK COMPLETION
async function toggleTask(taskId) {
  try {
    if (!checkAuth()) return;

    // Get the current task status
    const response = await fetch(`${API_BASE_URL}/tasks/get`, {
      method: "GET",
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    const task = tasks.find(t => t._id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Toggle the completion status
    const updateResponse = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update task");
    }

    loadTasks();
  } catch (error) {
    console.error("Toggle task error:", error);
    alert("Failed to update task!");
  }
}

// DELETE TASK
async function deleteTask(taskId) {
  try {
    if (!checkAuth()) return;

    if (!confirm("Are you sure you want to delete this task?")) return;

    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    loadTasks();
  } catch (error) {
    console.error("Delete task error:", error);
    alert("Failed to delete task!");
  }
}

// EDIT TASK - OPEN MODAL
let currentEditingTaskId = null;
function editTask(taskId, title, description, category, priority) {
  currentEditingTaskId = taskId;
  
  document.getElementById("editTaskTitle").value = title;
  document.getElementById("editTaskDescription").value = description;
  document.getElementById("editTaskCategory").value = category;
  document.getElementById("editTaskPriority").value = priority;
  
  document.getElementById("editModal").classList.remove("hidden");
}

// CLOSE EDIT MODAL
function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
  currentEditingTaskId = null;
}

// SAVE EDIT TASK
async function saveEditTask() {
  try {
    if (!checkAuth() || !currentEditingTaskId) return;

    const title = document.getElementById("editTaskTitle").value.trim();
    const description = document.getElementById("editTaskDescription").value.trim();
    const category = document.getElementById("editTaskCategory").value;
    const priority = document.getElementById("editTaskPriority").value;

    if (!title) {
      return alert("Task title is required!");
    }

    const response = await fetch(`${API_BASE_URL}/tasks/${currentEditingTaskId}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({
        title,
        description,
        category,
        priority,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    closeEditModal();
    loadTasks();
    alert("Task updated successfully!");
  } catch (error) {
    console.error("Save edit task error:", error);
    alert("Failed to update task!");
  }
}

// CLOSE MODAL WHEN CLICKING OUTSIDE
window.addEventListener("click", (e) => {
  const modal = document.getElementById("editModal");
  if (e.target === modal) {
    closeEditModal();
  }
});

// FILTER TASKS
function filterTasks(filter) {
  loadTasks(filter);
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

// SORT TASKS
let currentSort = "priority";
function sortBy(sortType) {
  currentSort = sortType;
  const currentFilter = document.querySelector('.filter-btn.active')?.textContent.trim() || 'all';
  loadTasks(currentFilter === 'All' ? 'all' : currentFilter === '✅ Completed' ? 'completed' : 'pending');
}

// PERFORM SEARCH
let currentSearchTerm = "";
function performSearch() {
  const searchInput = document.getElementById("searchInput");
  currentSearchTerm = searchInput?.value || "";
  
  // Reload with current filter
  const currentFilter = document.querySelector('.filter-btn.active')?.innerHTML || 'all';
  if (currentFilter.includes('Pending')) {
    loadTasks('pending');
  } else if (currentFilter.includes('Completed')) {
    loadTasks('completed');
  } else {
    loadTasks('all');
  }
}

// SHOW TIME-BASED GREETING
function showTimeGreeting() {
  const greeting = getTimeBasedSuggestion();
  const greetingElement = document.getElementById("timeGreeting");
  if (greetingElement) {
    greetingElement.textContent = greeting;
  }
}

// CLOSE SUGGESTIONS WHEN CLICKING OUTSIDE
document.addEventListener("click", (e) => {
  const suggestionPanel = document.getElementById("suggestionPanel");
  const taskInput = document.getElementById("taskInput");
  
  if (suggestionPanel && !suggestionPanel.contains(e.target) && e.target !== taskInput) {
    suggestionPanel.classList.add("hidden");
  }
});

// INITIALIZE ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("index.html") || 
      window.location.pathname.endsWith("/")) {
    checkAuth();
    displayWelcome();
    showTimeGreeting();
    loadTasks();
  }
});

// AUTH
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) window.location.href = "login.html";
  else document.getElementById("welcomeUser").innerText = "Welcome, " + user.name;
}

// HELPERS
const nameInput = () => document.getElementById("name")?.value.trim();
const emailInput = () => document.getElementById("email")?.value.trim();
const passwordInput = () => document.getElementById("password")?.value.trim();

// TASKS
function getTasks() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return JSON.parse(localStorage.getItem("tasks_" + user.email)) || [];
}

function saveTasks(tasks) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  localStorage.setItem("tasks_" + user.email, JSON.stringify(tasks));
}

let currentFilter = "all";

// LOAD
window.onload = () => {
  if (window.location.pathname.includes("index.html")) {
    checkAuth();
    displayTasks();
  }
};

// ADD TASK
function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  const tasks = getTasks();
  tasks.push({ text: input.value, completed: false });

  saveTasks(tasks);
  input.value = "";
  displayTasks();
}

// DISPLAY
function displayTasks() {
  const list = document.getElementById("taskList");
  const counter = document.getElementById("taskCounter");

  let tasks = getTasks();

  if (currentFilter === "completed") tasks = tasks.filter(t => t.completed);
  if (currentFilter === "pending") tasks = tasks.filter(t => !t.completed);

  counter.innerText = "Tasks: " + tasks.length;
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) updateTask(index, newText);
    };

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("delete-btn");
    del.onclick = () => deleteTask(index);

    li.append(span, edit, del);
    list.appendChild(li);
  });
}

// FILTER
function filterTasks(type) {
  currentFilter = type;
  displayTasks();
}

// TOGGLE
function toggleTask(i) {
  const tasks = getTasks();
  tasks[i].completed = !tasks[i].completed;
  saveTasks(tasks);
  displayTasks();
}

// UPDATE
function updateTask(i, text) {
  const tasks = getTasks();
  tasks[i].text = text;
  saveTasks(tasks);
  displayTasks();
}

// DELETE
function deleteTask(i) {
  const tasks = getTasks();
  tasks.splice(i, 1);
  saveTasks(tasks);
  displayTasks();
}