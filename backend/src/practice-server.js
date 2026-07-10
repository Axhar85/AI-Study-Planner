const express = require("express");

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.json({
    message: "AI Study Planner backend is running",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:4000`);
});
