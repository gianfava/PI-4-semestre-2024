const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const sensorRoutes = require("./routes/sensorRoutes");
const schedulerService = require("./services/schedulerService");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", sensorRoutes);

schedulerService.init();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
