const express = require("express");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use("/health", healthRoutes);

module.exports = app;