const math = require("mathjs");
const SensorData = require("../models/sensorData");

function calculateStats(data) {
    return {
        media: math.mean(data),
        mediana: math.median(data),
        desvioPadrao: math.std(data),
        minimo: math.min(data),
        maximo: math.max(data),
    };
}

async function getTemperatureStats(req, res) {
    try {
        const data = await SensorData.fetchSensorData();
        const temperaturas = data.map((item) => item.temperatura);
        const stats = calculateStats(temperaturas);
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas de temperatura",
        });
    }
}

async function getHumidityStats(req, res) {
    try {
        const data = await SensorData.fetchSensorData();
        const umidades = data.map((item) => item.umidade);
        const stats = calculateStats(umidades);
        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas de umidade",
        });
    }
}

async function getGeneralStats(req, res) {
    try {
        const data = await SensorData.fetchSensorData();
        const temperaturas = data.map((item) => item.temperatura);
        const umidades = data.map((item) => item.umidade);

        const stats = {
            temperatura: calculateStats(temperaturas),
            umidade: calculateStats(umidades),
        };

        res.json(stats);
    } catch (error) {
        console.error("Erro ao calcular estatísticas gerais:", error);
        res.status(500).json({ error: "Erro ao calcular estatísticas gerais" });
    }
}

async function getLastDayStats(req, res) {
    try {
        const data = await SensorData.fetchSensorData();
        const umDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const dadosUltimoDia = data.filter(
            (item) => new Date(item.data_hora) > umDiaAtras
        );

        const temperaturas = dadosUltimoDia.map((item) => item.temperatura);
        const umidades = dadosUltimoDia.map((item) => item.umidade);

        const stats = {
            temperatura: calculateStats(temperaturas),
            umidade: calculateStats(umidades),
            numeroLeituras: dadosUltimoDia.length,
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas do último dia",
        });
    }
}

async function getRawData(req, res) {
    try {
        const data = await SensorData.fetchSensorData();
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
