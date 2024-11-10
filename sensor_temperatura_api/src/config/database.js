const { Pool } = require("pg");
const environment = require("./environment");

const pool = new Pool({
	user: environment.DB_USER,
	host: environment.DB_HOST,
	database: environment.DB_NAME,
	password: environment.DB_PASSWORD,
	port: environment.DB_PORT,
});

module.exports = pool;
