const express = require("express");
const {
  getSubjects,
  createSubject,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/subjectController");

const router = express.Router();

router.get("/", getSubjects);
router.post("/", createSubject);
router.post("/:subjectId/tasks", createTask);
router.patch("/:subjectId/tasks/:taskId", updateTask);
router.delete("/:subjectId/tasks/:taskId", deleteTask);

module.exports = router;
