const express = require("express");
const sensorController = require("../controllers/sensorController");
const asyncHandler = require("../../../utils/asyncHandler");

const router = express.Router();

router.get("/data", asyncHandler(sensorController.getSensorData));
router.get("/current", asyncHandler(sensorController.getCurrentSensorData));

module.exports = router;
