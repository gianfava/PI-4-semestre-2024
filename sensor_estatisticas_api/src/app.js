const express = require("express");
const statsRoutes = require("./api/v1/routes/statsRoutes");
const userRoutes = require("./api/v1/routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
