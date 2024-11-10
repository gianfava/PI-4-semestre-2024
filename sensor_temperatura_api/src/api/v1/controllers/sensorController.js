const sensorService = require("../services/sensorService");
const sensorData = require("../models/sensorData");

async function getRealTimeData(req, res) {
	const dados = await sensorService.readSensor();
	res.json(dados);
}

async function getStoredData(req, res) {
	const dados = await sensorData.getAll();
	res.json(dados);
}

module.exports = {
	getRealTimeData,
	getStoredData,
};
