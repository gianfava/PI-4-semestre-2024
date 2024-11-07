const axios = require("axios");
const { faker } = require("@faker-js/faker");

const SENSOR_API_BASE_URL =
    process.env.SENSOR_API_BASE_URL || "http://localhost:3000";
const USE_FAKE_DATA = process.env.USE_FAKE_DATA === "true";

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

module.exports = {
    fetchSensorData,
};
