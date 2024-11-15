const SensorData = require("../models/sensorData");
const { calculateStats } = require("../../../utils/statsCalculator");

async function getTemperatureStats(startDate, endDate) {
	const data = await SensorData.fetchSensorData(startDate, endDate);
	const temperaturas = data.map((item) => item.temperatura);
	return calculateStats(temperaturas);
}

async function getHumidityStats(startDate, endDate) {
	const data = await SensorData.fetchSensorData(startDate, endDate);
	const umidades = data.map((item) => item.umidade);
	return calculateStats(umidades);
}

async function getGeneralStats(startDate, endDate) {
	const data = await SensorData.fetchSensorData(startDate, endDate);
	const temperaturas = data.map((item) => item.temperatura);
	const umidades = data.map((item) => item.umidade);

	return {
		temperatura: calculateStats(temperaturas),
		umidade: calculateStats(umidades),
	};
}

async function getLastDayStats() {
	const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
	const data = await SensorData.fetchSensorData(oneDayAgo);

	const temperaturas = data.map((item) => item.temperatura);
	const umidades = data.map((item) => item.umidade);

	return {
		temperatura: calculateStats(temperaturas),
		umidade: calculateStats(umidades),
		numeroLeituras: data.length,
	};
}

async function getCurrentData() {
	return SensorData.fetchCurrentSensorData();
}

function groupDataByDay(data) {
	const groupedData = {};
	data.forEach((item) => {
		const date = item.data_hora.split("T")[0]; // Extrai a data (YYYY-MM-DD)
		if (!groupedData[date]) {
			groupedData[date] = [];
		}
		groupedData[date].push(item);
	});
	return groupedData;
}

function calculateDailyAverage(groupedData, property) {
	const dailyAverages = [];
	for (const [date, dataPoints] of Object.entries(groupedData)) {
		const values = dataPoints.map((item) => item[property]);
		const average =
			values.reduce((sum, value) => Number(sum) + Number(value), 0) / values.length;
		dailyAverages.push({ date, average: Number(average.toFixed(2)) });
	}
	return dailyAverages;
}

async function getDailyTemperatureAverage(startDate, endDate) {
	const data = await SensorData.fetchSensorData(startDate, endDate);
	console.log(data);
	const groupedData = groupDataByDay(data);
	return calculateDailyAverage(groupedData, "temperatura");
}

async function getDailyHumidityAverage(startDate, endDate) {
	const data = await SensorData.fetchSensorData(startDate, endDate);
	const groupedData = groupDataByDay(data);
	return calculateDailyAverage(groupedData, "umidade");
}

module.exports = {
	getTemperatureStats,
	getHumidityStats,
	getGeneralStats,
	getLastDayStats,
	getCurrentData,
	getDailyTemperatureAverage,
	getDailyHumidityAverage,
};
