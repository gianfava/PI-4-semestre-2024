const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

router.get("/sensor", sensorController.getRealTimeData);
router.get("/dados", sensorController.getStoredData);

module.exports = router;
