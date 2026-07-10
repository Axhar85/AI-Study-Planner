const subjects = require("../data/subjects");

const getSubjects = (req, res) => {
  res.json(subjects);
};

const createSubject = (req, res) => {
  const subjectName = req.body.name;

  if (!subjectName || subjectName.trim() === "") {
    return res.status(400).json({
      message: "Subject name is required",
    });
  }

  const newSubject = {
    id: Date.now(),
    name: subjectName,
    tasks: [],
  };

  subjects.push(newSubject);

  res.status(201).json(newSubject);
};

const createTask = (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const subject = subjects.find((item) => item.id === subjectId);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  const taskTitle = req.body.title;

  if (!taskTitle || taskTitle.trim() === "") {
    return res.status(400).json({
      message: "Task title is required",
    });
  }

  const newTask = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };

  subject.tasks.push(newTask);

  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const taskId = Number(req.params.taskId);
  const completed = req.body.completed;

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      message: "Completed must be true or false",
    });
  }

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

  task.completed = completed;

  res.json(task);
};

const deleteTask = (req, res) => {
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
};

module.exports = {
  getSubjects,
  createSubject,
  createTask,
  updateTask,
  deleteTask,
};
