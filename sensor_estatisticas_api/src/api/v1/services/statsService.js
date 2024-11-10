const SensorData = require("../models/sensorData");
const { calculateStats } = require("../../../utils/statsCalculator");

async function getTemperatureStats() {
	const data = await SensorData.fetchSensorData();
	const temperaturas = data.map((item) => item.temperatura);
	return calculateStats(temperaturas);
}

async function getHumidityStats() {
	const data = await SensorData.fetchSensorData();
	const umidades = data.map((item) => item.umidade);
	return calculateStats(umidades);
}

async function getGeneralStats() {
	const data = await SensorData.fetchSensorData();
	const temperaturas = data.map((item) => item.temperatura);
	const umidades = data.map((item) => item.umidade);

	return {
		temperatura: calculateStats(temperaturas),
		umidade: calculateStats(umidades),
	};
}

async function getLastDayStats() {
	const data = await SensorData.fetchSensorData();
	const umDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000);
	const dadosUltimoDia = data.filter(
		(item) => new Date(item.data_hora) > umDiaAtras
	);

	const temperaturas = dadosUltimoDia.map((item) => item.temperatura);
	const umidades = dadosUltimoDia.map((item) => item.umidade);

	return {
		temperatura: calculateStats(temperaturas),
		umidade: calculateStats(umidades),
		numeroLeituras: dadosUltimoDia.length,
	};
}

async function getRawData() {
	return SensorData.fetchSensorData();
}

module.exports = {
	getTemperatureStats,
	getHumidityStats,
	getGeneralStats,
	getLastDayStats,
	getRawData,
};
