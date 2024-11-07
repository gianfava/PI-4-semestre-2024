const sensorService = require("../services/sensorService");
const sensorData = require("../models/sensorData");

async function getRealTimeData(req, res) {
    try {
        const dados = await sensorService.readSensor();
        res.json(dados);
    } catch (err) {
        res.status(500).json({ error: "Erro ao ler dados do sensor" });
    }
}

async function getStoredData(req, res) {
    try {
        const dados = await sensorData.getAll();
        res.json(dados);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar dados do banco" });
    }
}

module.exports = {
    getRealTimeData,
    getStoredData,
};
