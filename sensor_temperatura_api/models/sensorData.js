const pool = require("../config/database");

async function insert(temperatura, umidade) {
    const client = await pool.connect();
    try {
        const query =
            "INSERT INTO sensor_dht11_dados (temperatura, umidade) VALUES ($1, $2)";
        await client.query(query, [temperatura, umidade]);
        console.log(
            `Dados inseridos: Temperatura ${temperatura}°C, Umidade ${umidade}%`
        );
    } catch (err) {
        console.error("Erro ao inserir dados:", err);
        throw err;
    } finally {
        client.release();
    }
}

async function getAll() {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM sensor_dht11_dados ORDER BY data_hora DESC"
        );
        return result.rows;
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {
    insert,
    getAll,
};
