const fs = require("fs");
const path = require("path");

const subjectsFilePath = path.join(__dirname, "subjects.json");

const loadSubjects = () => {
  const fileData = fs.readFileSync(subjectsFilePath, "utf8");
  return JSON.parse(fileData);
};

const saveSubjects = () => {
  fs.writeFileSync(subjectsFilePath, JSON.stringify(subjects, null, 2));
};

const subjects = loadSubjects();

module.exports = {
  subjects,
  saveSubjects,
};
