const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

let subjects = [
  {
    id: 1,
    name: "Mathematics",
    tasks: [
      {
        id: 1,
        title: "Practice algebra problems",
        completed: false,
      },
    ],
  },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Study Planner backend is running",
  });
});

app.get("/subjects", (req, res) => {
  res.json(subjects);
});

app.post("/subjects", (req, res) => {
  const newSubject = {
    id: Date.now(),
    name: req.body.name,
    tasks: [],
  };

  subjects.push(newSubject);

  res.status(201).json(newSubject);
});

app.post("/subjects/:subjectId/tasks", (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const subject = subjects.find((item) => item.id === subjectId);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };

  subject.tasks.push(newTask);

  res.status(201).json(newTask);
});

app.patch("/subjects/:subjectId/tasks/:taskId", (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const taskId = Number(req.params.taskId);

  const subject = subjects.find((item) => item.id === subjectId);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  const task = subject.tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.completed = req.body.completed;

  res.json(task);
});

app.delete("/subjects/:subjectId/tasks/:taskId", (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const taskId = Number(req.params.taskId);

  const subject = subjects.find((item) => item.id === subjectId);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  const taskIndex = subject.tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = subject.tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
