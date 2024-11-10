const statsService = require("../services/statsService");

async function getTemperatureStats(req, res) {
	try {
		const stats = await statsService.getTemperatureStats();
		res.json(stats);
	} catch (error) {
		res.status(500).json({
			error: "Erro ao calcular estatísticas de temperatura",
		});
	}
}

async function getHumidityStats(req, res) {
	try {
		const stats = await statsService.getHumidityStats();
		res.json(stats);
	} catch (error) {
		res.status(500).json({
			error: "Erro ao calcular estatísticas de umidade",
		});
	}
}

async function getGeneralStats(req, res) {
	try {
		const stats = await statsService.getGeneralStats();
		res.json(stats);
	} catch (error) {
		res.status(500).json({ error: "Erro ao calcular estatísticas gerais" });
	}
}

async function getLastDayStats(req, res) {
	try {
		const stats = await statsService.getLastDayStats();
		res.json(stats);
	} catch (error) {
		res.status(500).json({
			error: "Erro ao calcular estatísticas do último dia",
		});
	}
}

async function getRawData(req, res) {
	try {
		const data = await statsService.getRawData();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar dados" });
	}
}

module.exports = {
	getTemperatureStats,
	getHumidityStats,
	getGeneralStats,
	getLastDayStats,
	getRawData,
};
