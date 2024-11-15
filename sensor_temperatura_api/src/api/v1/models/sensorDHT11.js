const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

class SensorDHT11 extends Model {}

SensorDHT11.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		data_hora: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		temperatura: {
			type: DataTypes.DECIMAL(5, 2),
			allowNull: false,
		},
		umidade: {
			type: DataTypes.DECIMAL(5, 2),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "SensorDHT11",
		tableName: "sensor_dht11_dados",
		timestamps: false,
	}
);

module.exports = SensorDHT11;
