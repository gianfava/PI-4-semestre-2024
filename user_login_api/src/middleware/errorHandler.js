const AppError = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	// Log do erro para debug (em produção, use um sistema de logging apropriado)
	console.error(err);

	// Erro genérico para outros tipos de erro
	res.status(500).json({
		status: "error",
		message: "Erro interno do servidor",
	});
};

module.exports = errorHandler;
