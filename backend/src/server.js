const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const subjectRoutes = require("./routes/subjectRoutes");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Study Planner backend is running",
    subjectsUrl: "/api/subjects",
  });
});

app.use("/api/subjects", subjectRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
