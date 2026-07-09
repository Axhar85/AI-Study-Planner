const express = require("express");
const cors = require("cors");
require("dotenv").config();

const subjectRoutes = require("./routes/subjectRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Study Planner backend is running",
  });
});

app.use("/subjects", subjectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
