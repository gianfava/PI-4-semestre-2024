const express = require("express");
const cors = require("cors");
const apiRoutes = require("./api");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
