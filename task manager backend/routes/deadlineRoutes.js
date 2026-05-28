/**
 * Deadline Assistant Routes
 * ML-like deadline prediction endpoints
 */

const express = require("express");
const router = express.Router();
const deadlineController = require("../controllers/deadlineController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * POST /api/deadline/suggest
 * Get deadline suggestion for a new task
 * Body: { title, category, priority, description }
 */
router.post("/suggest", authMiddleware, deadlineController.suggestDeadline);

/**
 * GET /api/deadline/analyze/:taskId
 * Analyze deadline for a specific task
 */
router.get("/analyze/:taskId", authMiddleware, deadlineController.analyzeTaskDeadline);

/**
 * GET /api/deadline/all-tasks
 * Get deadline recommendations for all pending tasks
 */
router.get("/all-tasks", authMiddleware, deadlineController.getAllTasksDeadlineRecommendations);

module.exports = router;
