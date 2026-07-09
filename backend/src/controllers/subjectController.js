const subjects = require("../data/subjects");

const getSubjects = (req, res) => {
  res.json(subjects);
};

const createSubject = (req, res) => {
  const newSubject = {
    id: Date.now(),
    name: req.body.name,
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

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };

  subject.tasks.push(newTask);

  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
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
