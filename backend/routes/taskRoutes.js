const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasksForDate,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const requireAuth = require("../middleware/authMiddleware");

// Protect all task routes
router.use(requireAuth);

// Create new task
router.post("/", createTask);

// Get tasks for specific date
router.get("/", getTasksForDate);

// Update task (e.g., toggle done)
router.patch("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;
