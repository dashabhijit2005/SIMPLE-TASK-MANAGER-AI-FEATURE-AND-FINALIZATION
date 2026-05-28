const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getAISuggestions,
} = require("../controllers/taskController");

router.post("/add", authMiddleware, addTask);
router.get("/get", authMiddleware, getTasks);
router.get("/all", authMiddleware, getTasks); // Backward compatibility
router.put("/:id", authMiddleware, updateTask);
router.put("/update/:id", authMiddleware, updateTask); // Backward compatibility
router.delete("/:id", authMiddleware, deleteTask);
router.delete("/delete/:id", authMiddleware, deleteTask); // Backward compatibility

// AI Suggestion endpoint
router.post("/ai/suggest", authMiddleware, getAISuggestions);

module.exports = router;