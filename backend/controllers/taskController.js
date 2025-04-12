const Task = require("../models/task");

// Create a new task
const createTask = async (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res
      .status(400)
      .json({ error: "Please Enter the task in required date properly." });
  }

  try {
    const task = await Task.create({
      user: req.user._id,
      title,
      date,
      completed: false,
    });

    res.status(201).json({ msg: "task created!", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!" });
  }
};

// Get all tasks for a specific date
const getTasksForDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date is required!" });
  }

  try {
    const tasks = await Task.find({
      user: req.user._id,
      date: date,
    });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks :(" });
  }
};


// Update task completion status (toggle)
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found!" });
    }

    task.completed = completed; // use the actual value from frontend
    await task.save();

    res.status(200).json({ msg: "Task updated!", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task." });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ error: "Task not found!" });
    }

    res.status(200).json({ msg: "Task deleted!", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task." });
  }
};

module.exports = {
  createTask,
  getTasksForDate,
  updateTask,
  deleteTask,
};
