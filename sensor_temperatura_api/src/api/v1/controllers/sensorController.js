const sensorService = require("../services/sensorService");

async function getSensorData(req, res) {
	try {
		const { startDate, endDate } = req.query;
		const sensorData = await sensorService.getSensorData(
			startDate,
			endDate
		);
		res.json(sensorData);
	} catch (error) {
		console.error("Erro ao obter dados do sensor:", error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

async function getCurrentSensorData(req, res) {
	try {
		const currentData = await sensorService.getCurrentSensorData();
		res.json(currentData);
	} catch (error) {
		console.error("Erro ao obter dados atuais do sensor:", error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

module.exports = {
	getSensorData,
	getCurrentSensorData,
};
