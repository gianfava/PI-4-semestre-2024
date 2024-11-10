const sensor = require("node-dht-sensor");
const sensorData = require("../models/sensorData");
const environment = require("../../../config/environment");

function readSensor() {
	return new Promise((resolve, reject) => {
		sensor.read(
			environment.SENSOR_TYPE,
			environment.SENSOR_PIN,
			(err, temperature, humidity) => {
				if (err) reject(err);
				else resolve({ temperature, humidity });
			}
		);
	});
}

async function captureAndInsertData() {
	try {
		const { temperature, humidity } = await readSensor();
		const insertedData = await sensorData.insert(temperature, humidity);
		console.log(
			`Dados inseridos: Temperatura ${temperature}°C, Umidade ${humidity}%`
		);
		return insertedData;
	} catch (err) {
		console.error("Erro ao capturar ou inserir dados:", err);
		throw err;
	}
}

module.exports = {
	readSensor,
	captureAndInsertData,
};
