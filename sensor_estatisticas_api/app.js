const express = require("express");
const axios = require("axios");
const math = require("mathjs");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const SENSOR_API_BASE_URL =
    process.env.SENSOR_API_BASE_URL || "http://localhost:3000";
const USE_FAKE_DATA = process.env.USE_FAKE_DATA === "true";

// Função para gerar dados fictícios
function generateFakeData(count = 100) {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return Array.from({ length: count }, () => ({
        data_hora: faker.date
            .between({ from: oneWeekAgo, to: new Date() })
            .toISOString(),
        temperatura: faker.number.float({ min: 15, max: 35, precision: 0.1 }),
        umidade: faker.number.float({ min: 30, max: 80, precision: 0.1 }),
    }));
}

// Função auxiliar para buscar dados do sensor
async function fetchSensorData() {
    if (USE_FAKE_DATA) {
        console.log("Usando dados fictícios");
        return generateFakeData();
    }

    try {
        const response = await axios.get(`${SENSOR_API_BASE_URL}/dados`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
        throw error;
    }
}

// Endpoint para estatísticas de temperatura
app.get("/stats/temperatura", async (req, res) => {
    try {
        const data = await fetchSensorData();
        const temperaturas = data.map((item) => item.temperatura);

        const stats = {
            media: math.mean(temperaturas),
            mediana: math.median(temperaturas),
            desvioPadrao: math.std(temperaturas),
            minimo: math.min(temperaturas),
            maximo: math.max(temperaturas),
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas de temperatura",
        });
    }
});

// Endpoint para estatísticas de umidade
app.get("/stats/umidade", async (req, res) => {
    try {
        const data = await fetchSensorData();
        const umidades = data.map((item) => item.umidade);

        const stats = {
            media: math.mean(umidades),
            mediana: math.median(umidades),
            desvioPadrao: math.std(umidades),
            minimo: math.min(umidades),
            maximo: math.max(umidades),
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas de umidade",
        });
    }
});

// Endpoint para estatísticas gerais
app.get("/stats/geral", async (req, res) => {
    try {
        const data = await fetchSensorData();
        const temperaturas = data.map((item) => item.temperatura);
        const umidades = data.map((item) => item.umidade);

        const stats = {
            temperatura: {
                media: math.mean(temperaturas),
                mediana: math.median(temperaturas),
                desvioPadrao: math.std(temperaturas),
                minimo: math.min(temperaturas),
                maximo: math.max(temperaturas),
            },
            umidade: {
                media: math.mean(umidades),
                mediana: math.median(umidades),
                desvioPadrao: math.std(umidades),
                minimo: math.min(umidades),
                maximo: math.max(umidades),
            },
        };

        res.json(stats);
    } catch (error) {
        console.error("Erro ao calcular estatísticas gerais:", error);
        res.status(500).json({ error: "Erro ao calcular estatísticas gerais" });
    }
});

// Endpoint para dados do último dia
app.get("/stats/ultimoDia", async (req, res) => {
    try {
        const data = await fetchSensorData();
        const umDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const dadosUltimoDia = data.filter(
            (item) => new Date(item.data_hora) > umDiaAtras
        );

        const temperaturas = dadosUltimoDia.map((item) => item.temperatura);
        const umidades = dadosUltimoDia.map((item) => item.umidade);

        const stats = {
            temperatura: {
                media: math.mean(temperaturas),
                mediana: math.median(temperaturas),
                desvioPadrao: math.std(temperaturas),
            },
            umidade: {
                media: math.mean(umidades),
                mediana: math.median(umidades),
                desvioPadrao: math.std(umidades),
            },
            numeroLeituras: dadosUltimoDia.length,
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao calcular estatísticas do último dia",
        });
    }
});

// Endpoint para visualizar dados brutos (útil para debug)
app.get("/dados", async (req, res) => {
    try {
        const data = await fetchSensorData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados" });
    }
});

app.listen(port, () => {
    console.log(`API de Análise rodando na porta ${port}`);
    console.log(`Usando dados ${USE_FAKE_DATA ? "fictícios" : "reais"}`);
});
