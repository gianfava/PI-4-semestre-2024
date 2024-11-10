const express = require("express");
const sensorController = require("../controllers/sensorController");
const asyncHandler = require("../../../utils/asyncHandler");

const router = express.Router();

router.get("/realtime", asyncHandler(sensorController.getRealTimeData));
router.get("/data", asyncHandler(sensorController.getStoredData));

module.exports = router;
