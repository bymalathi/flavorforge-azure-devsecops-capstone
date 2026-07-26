const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");

const app = express();

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Parse incoming JSON requests
app.use(express.json());

// Health API routes
app.use("/health", healthRoutes);

module.exports = app;