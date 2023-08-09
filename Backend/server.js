const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let tasks = [];

// Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Add new Task
app.post("/api/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body, completed: false };
  tasks.push(newTask);

  console.log(tasks);
  res.json(newTask);
});

// Change task completed property
app.patch("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  const task = tasks[index];
  task.completed = req.body.completed;

  res.json(task);
});

// Delete Specific task
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);

  res.json({ id });
});

app.listen(5001, () => console.log("Server running on port 5000"));
