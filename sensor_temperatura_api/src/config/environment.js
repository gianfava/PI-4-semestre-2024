require("dotenv").config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 3000,
	DB_USER: process.env.DB_USER,
	DB_HOST: process.env.DB_HOST,
	DB_NAME: process.env.DB_NAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_PORT: process.env.DB_PORT,
	SENSOR_TYPE: 22, // DHT11
	SENSOR_PIN: 22, // GPIO pin número 22
};
