const express = require("express");
const statsRoutes = require("./api/v1/routes/statsRoutes");

const app = express();

app.use("/api/v1/stats", statsRoutes);

module.exports = app;
