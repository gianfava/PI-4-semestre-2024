const sensor = require("node-dht-sensor");
const sensorData = require("../models/sensorData");

const sensorType = 22; // DHT11
const sensorPin = 22; // GPIO pin número 22 (ajustar conforme necessário)

function readSensor() {
    return new Promise((resolve, reject) => {
        sensor.read(sensorType, sensorPin, (err, temperature, humidity) => {
            if (err) {
                reject(err);
            } else {
                resolve({ temperature, humidity });
            }
        });
    });
}

async function captureAndInsertData() {
    try {
        const { temperature, humidity } = await readSensor();
        await sensorData.insert(temperature, humidity);
    } catch (err) {
        console.error("Erro ao capturar ou inserir dados:", err);
    }
}

module.exports = {
    readSensor,
    captureAndInsertData,
};
