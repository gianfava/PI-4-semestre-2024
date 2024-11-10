const express = require("express");
const statsController = require("../controllers/statsController");

const router = express.Router();

router.get("/temperatura", statsController.getTemperatureStats);
router.get("/umidade", statsController.getHumidityStats);
router.get("/geral", statsController.getGeneralStats);
router.get("/ultimo-dia", statsController.getLastDayStats);
router.get("/dados", statsController.getRawData);

module.exports = router;
