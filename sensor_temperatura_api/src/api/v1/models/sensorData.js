const pool = require("../../../config/database");

async function insert(temperatura, umidade) {
	const client = await pool.connect();
	try {
		const query =
			"INSERT INTO sensor_dht11_dados (temperatura, umidade) VALUES ($1, $2) RETURNING *";
		const result = await client.query(query, [temperatura, umidade]);
		return result.rows[0];
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
	} finally {
		client.release();
	}
}

module.exports = {
	insert,
	getAll,
};
