const Task = require("../models/Task");

// ============ SMART RECOMMENDATION SYSTEM ============

// Helper: Calculate category weights based on completed tasks
const calculateCategoryWeights = (completedTasks) => {
  const weights = {};

  completedTasks.forEach((task) => {
    const category = task.category || "General";
    const daysSinceCompletion = Math.floor(
      (Date.now() - new Date(task.updatedAt)) / (1000 * 60 * 60 * 24)
    );

    // Recency score: Recent tasks weighted higher (max 2.0)
    const recencyScore = Math.max(0.5, 2.0 - daysSinceCompletion * 0.1);

    // Initialize or update weight
    if (!weights[category]) {
      weights[category] = { count: 0, totalScore: 0 };
    }

    weights[category].count += 1;
    weights[category].totalScore += recencyScore;
  });

  // Convert to weighted scores (frequency + recency)
  const scores = {};
  Object.entries(weights).forEach(([category, data]) => {
    scores[category] = (data.count * 0.6 + data.totalScore * 0.4).toFixed(2);
  });

  return scores;
};

// ============ ENDPOINT 1: GET RECOMMENDATIONS ============
const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get completed tasks
    const completedTasks = await Task.find({
      user: userId,
      completed: true,
    });

    // Get incomplete tasks
    const incompleteTasks = await Task.find({
      user: userId,
      completed: false,
    });

    if (completedTasks.length === 0) {
      return res.status(200).json({
        recommendations: incompleteTasks.slice(0, 5),
        reason: "No completed tasks yet. Showing your current tasks.",
        message: "Complete tasks to get smarter recommendations!",
      });
    }

    // Calculate category weights
    const categoryWeights = calculateCategoryWeights(completedTasks);

    // Get top categories
    const topCategories = Object.entries(categoryWeights)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    // Filter incomplete tasks by top categories
    const recommendedTasks = incompleteTasks.filter((task) =>
      topCategories.includes(task.category || "General")
    );

    // If not enough recommendations, add from other categories
    if (recommendedTasks.length < 5) {
      const otherTasks = incompleteTasks.filter(
        (task) => !topCategories.includes(task.category || "General")
      );
      recommendedTasks.push(...otherTasks);
    }

    res.status(200).json({
      recommendations: recommendedTasks.slice(0, 5),
      topCategories,
      weights: categoryWeights,
      completedCount: completedTasks.length,
      reason:
        "Based on your completed tasks, these categories are your focus",
      message: "Keep up the great work! 💪",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to generate recommendations",
    });
  }
};

// ============ ENDPOINT 2: GET ANALYTICS ============
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all tasks
    const allTasks = await Task.find({ user: userId });
    const completedTasks = allTasks.filter((t) => t.completed);
    const pendingTasks = allTasks.filter((t) => !t.completed);

    // Category breakdown
    const categoryStats = {};
    allTasks.forEach((task) => {
      const cat = task.category || "General";
      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, completed: 0, pending: 0 };
      }
      categoryStats[cat].total += 1;
      if (task.completed) {
        categoryStats[cat].completed += 1;
      } else {
        categoryStats[cat].pending += 1;
      }
    });

    // Priority breakdown
    const priorityStats = {};
    allTasks.forEach((task) => {
      const pri = task.priority || "Medium";
      if (!priorityStats[pri]) {
        priorityStats[pri] = { total: 0, completed: 0 };
      }
      priorityStats[pri].total += 1;
      if (task.completed) {
        priorityStats[pri].completed += 1;
      }
    });

    // Completion rate
    const completionRate =
      allTasks.length > 0
        ? ((completedTasks.length / allTasks.length) * 100).toFixed(1)
        : 0;

    // Task created this week
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thisWeekTasks = allTasks.filter(
      (t) => new Date(t.createdAt) > oneWeekAgo
    );

    res.status(200).json({
      summary: {
        totalTasks: allTasks.length,
        completedTasks: completedTasks.length,
        pendingTasks: pendingTasks.length,
        completionRate: `${completionRate}%`,
        thisWeekCreated: thisWeekTasks.length,
      },
      byCategory: categoryStats,
      byPriority: priorityStats,
      avgTasksPerCategory:
        Object.keys(categoryStats).length > 0
          ? (allTasks.length / Object.keys(categoryStats).length).toFixed(1)
          : 0,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch analytics",
    });
  }
};

// ============ ENDPOINT 3: GET INSIGHTS ============
const getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all tasks
    const allTasks = await Task.find({ user: userId });
    const completedTasks = allTasks.filter((t) => t.completed);

    // Calculate insights
    const insights = [];

    // Insight 1: Most productive category
    const categoryFreq = {};
    completedTasks.forEach((task) => {
      const cat = task.category || "General";
      categoryFreq[cat] = (categoryFreq[cat] || 0) + 1;
    });

    if (Object.keys(categoryFreq).length > 0) {
      const topCategory = Object.entries(categoryFreq).sort(
        ([, a], [, b]) => b - a
      )[0];
      insights.push({
        type: "top_category",
        title: "🌟 Most Productive Category",
        description: `You've completed ${topCategory[1]} tasks in "${topCategory[0]}"`,
        recommendation: `Keep focusing on ${topCategory[0]} - you're doing great!`,
      });
    }

    // Insight 2: Completion rate
    const completionRate =
      allTasks.length > 0
        ? (completedTasks.length / allTasks.length) * 100
        : 0;
    if (completionRate > 75) {
      insights.push({
        type: "high_completion",
        title: "🚀 Excellent Performance",
        description: `You have a ${completionRate.toFixed(1)}% completion rate`,
        recommendation:
          "You're crushing your goals! Consider taking on more challenges.",
      });
    } else if (completionRate > 50) {
      insights.push({
        type: "good_completion",
        title: "✨ Good Progress",
        description: `You have a ${completionRate.toFixed(1)}% completion rate`,
        recommendation: "You're on the right track. Keep pushing!",
      });
    } else if (allTasks.length > 0) {
      insights.push({
        type: "low_completion",
        title: "💡 Room for Improvement",
        description: `You have a ${completionRate.toFixed(1)}% completion rate`,
        recommendation:
          "Try breaking tasks into smaller steps or setting clearer deadlines.",
      });
    }

    // Insight 3: Priority balance
    const highPriority = allTasks.filter((t) => t.priority === "High");
    const lowPriority = allTasks.filter((t) => t.priority === "Low");
    if (highPriority.length === 0 && allTasks.length > 0) {
      insights.push({
        type: "priority_warning",
        title: "⚠️ Missing High Priority Tasks",
        description: "All your tasks seem to be low or medium priority",
        recommendation:
          "Consider identifying and scheduling some high-priority tasks.",
      });
    }

    // Insight 4: Momentum
    const recentTasks = allTasks.filter(
      (t) =>
        new Date(t.createdAt) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    const recentCompleted = recentTasks.filter((t) => t.completed);
    if (recentCompleted.length > 0) {
      insights.push({
        type: "momentum",
        title: "⚡ Building Momentum",
        description: `You completed ${recentCompleted.length} tasks this week`,
        recommendation: "Keep this streak going!",
      });
    }

    res.status(200).json({
      insights,
      totalInsights: insights.length,
      lastUpdated: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch insights",
    });
  }
};

// ============ ENDPOINT 4: GET TASK SUGGESTIONS ============
const getTaskSuggestions = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get completed tasks
    const completedTasks = await Task.find({
      user: userId,
      completed: true,
    });

    if (completedTasks.length === 0) {
      return res.status(200).json({
        suggestions: [
          "Start with a small task to build momentum",
          "Choose a category that interests you most",
          "Set a specific time to work on tasks",
          "Break large tasks into smaller sub-tasks",
        ],
        reason: "Since you're just starting, here are some general tips!",
      });
    }

    // Get user's preferred categories
    const categoryWeights = calculateCategoryWeights(completedTasks);
    const topCategories = Object.entries(categoryWeights)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([cat]) => cat);

    // Generate intelligent suggestions
    const suggestions = [
      `You're doing great with ${topCategories[0]} tasks - keep it up! 💪`,
      `Try mixing ${topCategories[0]} with other categories for balance 🎯`,
      `Set a goal to complete 5 more ${topCategories[0]} tasks this week 🎪`,
      `Consider breaking down complex ${topCategories[0]} tasks into smaller steps 📝`,
      `Schedule your best ${topCategories[0]} tasks during peak focus hours ⏰`,
    ];

    res.status(200).json({
      suggestions,
      yourTopCategories: topCategories,
      totalCompleted: completedTasks.length,
      motivation: "You've built great habits - let's keep the momentum! 🚀",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch suggestions",
    });
  }
};

module.exports = {
  getRecommendations,
  getAnalytics,
  getInsights,
  getTaskSuggestions,
};
