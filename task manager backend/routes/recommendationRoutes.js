const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getRecommendations,
  getAnalytics,
  getInsights,
  getTaskSuggestions,
} = require("../controllers/recommendationController");

// All routes require authentication
router.use(authMiddleware);

// GET /api/recommendations - Smart recommendations based on user's completed tasks
router.get("/recommendations", getRecommendations);

// GET /api/analytics - User task analytics and statistics
router.get("/analytics", getAnalytics);

// GET /api/insights - AI-powered insights about user patterns
router.get("/insights", getInsights);

// GET /api/suggestions - Task suggestions and motivation
router.get("/suggestions", getTaskSuggestions);

module.exports = router;
