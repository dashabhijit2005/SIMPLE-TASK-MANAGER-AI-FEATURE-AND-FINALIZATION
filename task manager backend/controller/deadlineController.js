/**
 * Deadline Assistant Controller
 * ML-like feature to suggest optimal deadlines for tasks
 * Based on task complexity, user habits, and workload
 */

const Task = require("../models/Task");

/**
 * Calculate task complexity score
 * Factors: Priority level, Category complexity
 */
const calculateComplexityScore = (priority, category) => {
  const priorityScores = {
    High: 3,
    Medium: 2,
    Low: 1
  };

  const categoryComplexity = {
    Coding: 3,
    Development: 3,
    Learning: 2,
    Design: 2,
    Documentation: 1,
    Testing: 2,
    General: 1
  };

  const priorityScore = priorityScores[priority] || 1;
  const categoryScore = categoryComplexity[category] || 1;

  // Combined complexity: weighted average
  return (priorityScore * 0.6 + categoryScore * 0.4).toFixed(2);
};

/**
 * Calculate average completion time in days
 * Based on user's historical data for similar tasks
 */
const calculateAverageCompletionTime = async (userId, category, priority) => {
  try {
    const completedTasks = await Task.find({
      user: userId,
      category: category || { $exists: true },
      priority: priority || { $exists: true },
      completed: true,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });

    if (completedTasks.length === 0) {
      // Default completion times based on complexity
      const complexity = calculateComplexityScore(priority, category);
      return parseFloat(complexity) * 2; // Days to complete
    }

    // Calculate average time to completion
    let totalDays = 0;
    completedTasks.forEach(task => {
      const createdDate = new Date(task.createdAt);
      const completedDate = new Date(task.updatedAt);
      const daysToComplete = (completedDate - createdDate) / (1000 * 60 * 60 * 24);
      totalDays += daysToComplete;
    });

    return Math.ceil(totalDays / completedTasks.length);
  } catch (error) {
    console.error("Error calculating completion time:", error);
    return 2; // Default 2 days
  }
};

/**
 * Calculate user's current workload
 * Pending tasks to adjust deadline buffer
 */
const calculateWorkloadFactor = async (userId) => {
  try {
    const pendingTasks = await Task.find({
      user: userId,
      completed: false
    });

    // Workload factor: 0.8 - 1.5 based on pending tasks
    const taskCount = pendingTasks.length;
    if (taskCount <= 2) return 1.0; // Normal
    if (taskCount <= 5) return 1.2; // Moderate load
    if (taskCount <= 10) return 1.4; // Heavy load
    return 1.5; // Very heavy load
  } catch (error) {
    console.error("Error calculating workload:", error);
    return 1.0;
  }
};

/**
 * Suggest optimal deadline for a task
 * POST /api/deadline/suggest
 */
exports.suggestDeadline = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, priority, description } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        error: "Task title is required"
      });
    }

    // Calculate task metrics
    const complexity = calculateComplexityScore(priority, category);
    const avgCompletionTime = await calculateAverageCompletionTime(userId, category, priority);
    const workloadFactor = await calculateWorkloadFactor(userId);

    // Calculate recommended deadline
    const baselineInDays = parseFloat(avgCompletionTime);
    const adjustedDaysForWorkload = Math.ceil(baselineInDays * workloadFactor);

    // Add buffer for unexpected delays (20-30%)
    const bufferPercentage = parseFloat(complexity) > 2.5 ? 0.3 : 0.2;
    const finalDays = Math.ceil(adjustedDaysForWorkload * (1 + bufferPercentage));

    // Calculate deadline date
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + finalDays);

    // Generate deadline recommendation
    const recommendation = {
      suggestedDays: finalDays,
      suggestedDeadline: deadlineDate.toISOString().split('T')[0],
      reasoning: {
        complexity: {
          score: complexity,
          explanation: complexity > 2.5 ? "High complexity task" : complexity > 1.5 ? "Medium complexity task" : "Low complexity task"
        },
        historicalPattern: {
          averageCompletionDays: baselineInDays,
          explanation: `Based on ${category} tasks of ${priority} priority`
        },
        workloadImpact: {
          currentPendingTasks: await Task.countDocuments({ user: userId, completed: false }),
          adjustmentFactor: workloadFactor,
          explanation: workloadFactor > 1.2 ? "Deadline extended due to high workload" : "Standard deadline"
        },
        safetyBuffer: {
          bufferPercentage: (bufferPercentage * 100).toFixed(0),
          explanation: "Added buffer for unexpected delays"
        }
      },
      tips: generateDeadlineTips(complexity, category, priority),
      confidence: calculateConfidence(category, priority),
      alternatives: generateAlternativeDeadlines(finalDays, complexity)
    };

    res.status(200).json({
      success: true,
      taskTitle: title,
      recommendation: recommendation,
      message: `Recommended deadline: ${finalDays} days from now (${deadlineDate.toDateString()})`
    });

  } catch (error) {
    console.error("Error suggesting deadline:", error);
    res.status(500).json({
      error: "Failed to generate deadline suggestion",
      details: error.message
    });
  }
};

/**
 * Get deadline analysis for a specific task
 * GET /api/deadline/analyze/:taskId
 */
exports.analyzeTaskDeadline = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    // Find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Verify ownership
    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Calculate metrics
    const complexity = calculateComplexityScore(task.priority, task.category);
    const avgCompletionTime = await calculateAverageCompletionTime(userId, task.category, task.priority);
    const workloadFactor = await calculateWorkloadFactor(userId);

    // Check if task is overdue
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
    const daysUntilDue = task.dueDate ? Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;

    const analysis = {
      taskId: task._id,
      title: task.title,
      currentStatus: task.completed ? "Completed" : "Pending",
      isOverdue: isOverdue,
      daysUntilDeadline: daysUntilDue,
      metrics: {
        complexity: complexity,
        estimatedCompletionDays: avgCompletionTime,
        workloadAdjustment: workloadFactor
      },
      recommendation: daysUntilDue < avgCompletionTime && !task.completed ? 
        "⚠️ This task might miss its deadline. Consider extending the deadline or reprioritizing." :
        "✅ Deadline appears reasonable based on your patterns",
      suggestion: generateTaskSuggestion(task, avgCompletionTime, daysUntilDue)
    };

    res.status(200).json({
      success: true,
      analysis: analysis
    });

  } catch (error) {
    console.error("Error analyzing deadline:", error);
    res.status(500).json({
      error: "Failed to analyze deadline",
      details: error.message
    });
  }
};

/**
 * Get deadline recommendations for all pending tasks
 * GET /api/deadline/all-tasks
 */
exports.getAllTasksDeadlineRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all pending tasks
    const pendingTasks = await Task.find({
      user: userId,
      completed: false
    }).sort({ createdAt: -1 });

    if (pendingTasks.length === 0) {
      return res.status(200).json({
        success: true,
        tasks: [],
        message: "All tasks are completed! Great work!"
      });
    }

    // Generate recommendations for each task
    const recommendations = await Promise.all(
      pendingTasks.map(async (task) => {
        const complexity = calculateComplexityScore(task.priority, task.category);
        const avgTime = await calculateAverageCompletionTime(userId, task.category, task.priority);

        return {
          taskId: task._id,
          title: task.title,
          category: task.category,
          priority: task.priority,
          complexity: complexity,
          estimatedDays: avgTime,
          urgency: urgencyLevel(task.priority, complexity),
          recommendation: `This ${task.priority.toLowerCase()} ${task.category} task should take approximately ${avgTime} days`
        };
      })
    );

    // Sort by urgency
    recommendations.sort((a, b) => {
      const urgencyOrder = { Critical: 1, High: 2, Medium: 3, Low: 4 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });

    res.status(200).json({
      success: true,
      totalPendingTasks: pendingTasks.length,
      recommendations: recommendations,
      summary: {
        criticalTasks: recommendations.filter(r => r.urgency === "Critical").length,
        highUrgency: recommendations.filter(r => r.urgency === "High").length,
        mediumUrgency: recommendations.filter(r => r.urgency === "Medium").length,
        lowUrgency: recommendations.filter(r => r.urgency === "Low").length
      }
    });

  } catch (error) {
    console.error("Error getting deadline recommendations:", error);
    res.status(500).json({
      error: "Failed to get deadline recommendations",
      details: error.message
    });
  }
};

// Helper functions

/**
 * Generate tips based on task characteristics
 */
function generateDeadlineTips(complexity, category, priority) {
  const tips = [];

  if (parseFloat(complexity) > 2.5) {
    tips.push("This is a complex task - break it into smaller sub-tasks");
    tips.push("Consider starting early to avoid last-minute rush");
  }

  if (priority === "High") {
    tips.push("This is a high-priority task - allocate focused time");
    tips.push("Block your calendar to avoid interruptions");
  }

  if (category === "Coding" || category === "Development") {
    tips.push("Remember to allocate time for testing and debugging");
    tips.push("Leave buffer time for code review if working in a team");
  }

  if (tips.length < 2) {
    tips.push("Prioritize this task alongside other work");
    tips.push("Regular progress check-ins will help track completion");
  }

  return tips.slice(0, 3);
}

/**
 * Calculate confidence level in the recommendation
 */
function calculateConfidence(category, priority) {
  // Higher confidence for common categories
  const commonCategories = ["Coding", "Development", "Learning"];
  const base = commonCategories.includes(category) ? 0.85 : 0.75;
  
  // Adjust based on priority
  const priorityBoost = priority === "High" ? 0.1 : priority === "Medium" ? 0.05 : 0;
  
  return Math.min(0.95, base + priorityBoost);
}

/**
 * Generate alternative deadline options
 */
function generateAlternativeDeadlines(mainDeadlineDays, complexity) {
  const baseScore = parseFloat(complexity);
  
  return {
    aggressive: Math.max(1, Math.ceil(mainDeadlineDays * 0.7)),
    normal: mainDeadlineDays,
    relaxed: Math.ceil(mainDeadlineDays * 1.3),
    explanation: "Choose aggressive for high motivation, normal for balanced approach, relaxed for complex tasks"
  };
}

/**
 * Determine urgency level
 */
function urgencyLevel(priority, complexity) {
  const complexityScore = parseFloat(complexity);
  
  if (priority === "High" && complexityScore > 2.5) return "Critical";
  if (priority === "High") return "High";
  if (priority === "Medium" && complexityScore > 2) return "High";
  if (priority === "Medium") return "Medium";
  return "Low";
}

/**
 * Generate actionable task suggestion
 */
function generateTaskSuggestion(task, estimatedDays, daysUntilDeadline) {
  if (daysUntilDeadline === null) {
    return `Start working on this task soon - estimated ${estimatedDays} days to complete`;
  }

  if (daysUntilDeadline < estimatedDays) {
    return `⚠️ Limited time! Only ${daysUntilDeadline} days left, but task typically takes ${estimatedDays} days`;
  }

  if (daysUntilDeadline >= estimatedDays * 1.5) {
    return `✅ Good! You have ${daysUntilDeadline - estimatedDays} extra days buffer beyond typical completion time`;
  }

  return `Good deadline - matches your typical completion pattern of ${estimatedDays} days`;
}
