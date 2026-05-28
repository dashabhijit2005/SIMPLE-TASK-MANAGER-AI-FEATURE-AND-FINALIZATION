const Task = require("../models/Task");

// AI Suggestion Database
const aiSuggestionsDB = {
  study: {
    suggestions: [
      "Study for 2 hours",
      "Study chapter 5",
      "Complete assignments",
      "Review notes",
      "Practice problems"
    ],
    category: "Education",
    priority: "High"
  },
  gym: {
    suggestions: [
      "Gym session - 1 hour",
      "Cardio workout",
      "Strength training",
      "Yoga class",
      "Swimming"
    ],
    category: "Fitness",
    priority: "High"
  },
  meeting: {
    suggestions: [
      "Team meeting - 30 mins",
      "Client call",
      "Standup meeting",
      "Review meeting",
      "Planning session"
    ],
    category: "Work",
    priority: "High"
  },
  workout: {
    suggestions: [
      "Home workout - 30 mins",
      "Morning run",
      "Weight training",
      "Stretching routine",
      "HIIT training"
    ],
    category: "Fitness",
    priority: "Medium"
  },
  shopping: {
    suggestions: [
      "Grocery shopping",
      "Buy groceries",
      "Shop for clothes",
      "Hardware shopping",
      "Online shopping"
    ],
    category: "Personal",
    priority: "Medium"
  },
  call: {
    suggestions: [
      "Call mom",
      "Team call",
      "Client call",
      "Check-in call",
      "Conference call"
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
      "Report emails"
    ],
    category: "Work",
    priority: "Medium"
  },
  project: {
    suggestions: [
      "Work on project",
      "Update project status",
      "Project planning",
      "Project review",
      "Complete project"
    ],
    category: "Work",
    priority: "High"
  },
  break: {
    suggestions: [
      "Coffee break - 15 mins",
      "Lunch break - 1 hour",
      "Short break",
      "Rest time",
      "Relaxation time"
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
      "Read news"
    ],
    category: "Learning",
    priority: "Medium"
  }
};

// Get AI Suggestions
const getAISuggestions = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({
        message: "Input text required",
        suggestions: []
      });
    }

    const inputLower = input.toLowerCase().trim();
    let suggestions = [];
    let category = "General";
    let priority = "Medium";

    // Find matching keyword
    for (const keyword in aiSuggestionsDB) {
      if (inputLower.includes(keyword)) {
        const data = aiSuggestionsDB[keyword];
        suggestions = data.suggestions.slice(0, 5);
        category = data.category;
        priority = data.priority;
        break;
      }
    }

    res.status(200).json({
      suggestions,
      category,
      priority,
      keyword: Object.keys(aiSuggestionsDB).find(k => inputLower.includes(k)) || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Task
const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    let category = "General";
    let priority = "Medium";

    // AI Logic - Enhanced with comprehensive keywords
    const titleLower = title.toLowerCase();

    // Education & Learning
    if (titleLower.includes("study")) {
      category = "Education";
      priority = "High";
    } else if (titleLower.includes("learn") || titleLower.includes("course") || titleLower.includes("tutorial")) {
      category = "Learning";
      priority = "High";
    }
    // Work & Professional
    else if (titleLower.includes("code") || titleLower.includes("debug") || titleLower.includes("test")) {
      category = "Work";
      priority = "High";
    } else if (titleLower.includes("meeting") || titleLower.includes("standup") || titleLower.includes("sync")) {
      category = "Work";
      priority = "High";
    } else if (titleLower.includes("project")) {
      category = "Work";
      priority = "High";
    } else if (titleLower.includes("presentation") || titleLower.includes("slides")) {
      category = "Work";
      priority = "High";
    } else if (titleLower.includes("email") || titleLower.includes("report")) {
      category = "Work";
      priority = "Medium";
    } else if (titleLower.includes("review")) {
      category = "Work";
      priority = "High";
    }
    // Fitness & Health
    else if (titleLower.includes("gym") || titleLower.includes("workout") || titleLower.includes("exercise")) {
      category = "Fitness";
      priority = "High";
    } else if (titleLower.includes("health") || titleLower.includes("doctor") || titleLower.includes("appointment")) {
      category = "Health";
      priority = "High";
    } else if (titleLower.includes("meditation") || titleLower.includes("yoga")) {
      category = "Health";
      priority = "Low";
    }
    // Communication
    else if (titleLower.includes("call")) {
      category = "Communication";
      priority = "Medium";
    }
    // Personal
    else if (titleLower.includes("shopping") || titleLower.includes("grocery")) {
      category = "Personal";
      priority = "Medium";
    } else if (titleLower.includes("cooking") || titleLower.includes("meal") || titleLower.includes("food")) {
      category = "Personal";
      priority = "Medium";
    } else if (titleLower.includes("cleaning") || titleLower.includes("laundry")) {
      category = "Personal";
      priority = "Low";
    } else if (titleLower.includes("break") || titleLower.includes("rest")) {
      category = "Personal";
      priority = "Low";
    }
    // Creative & Learning
    else if (titleLower.includes("creative") || titleLower.includes("design") || titleLower.includes("write")) {
      category = "Creative";
      priority = "Medium";
    } else if (titleLower.includes("read")) {
      category = "Learning";
      priority = "Medium";
    }
    // Social
    else if (titleLower.includes("friend") || titleLower.includes("family") || titleLower.includes("event")) {
      category = "Social";
      priority = "Medium";
    }
    // Travel
    else if (titleLower.includes("travel") || titleLower.includes("trip")) {
      category = "Personal";
      priority = "Medium";
    }

    const task = await Task.create({
      title,
      description,
      category,
      priority,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task Added Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getAISuggestions,
};