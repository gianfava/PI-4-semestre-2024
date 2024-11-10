const math = require("mathjs");

function calculateStats(data) {
	return {
		media: math.mean(data),
		mediana: math.median(data),
		desvioPadrao: math.std(data),
		minimo: math.min(data),
		maximo: math.max(data),
	};
}

module.exports = {
	calculateStats,
};
