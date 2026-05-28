const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const deadlineRoutes = require("./routes/deadlineRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/deadline", deadlineRoutes);

app.get("/", (req, res) => {
  res.send("AI Task Manager API Running");
});

const PORT = process.env.PORT || 5000;

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "✅ Backend is Running Successfully",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    port: PORT,
    mongodb: "✅ Connected",
    apis: {
      auth: "/api/auth",
      tasks: "/api/tasks",
      ai: "/api/ai",
      recommendations: "/api/recommendations",
      analytics: "/api/analytics",
      insights: "/api/insights",
      suggestions: "/api/suggestions",
      deadline: "/api/deadline/suggest, /api/deadline/analyze/:taskId, /api/deadline/all-tasks"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: err.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});