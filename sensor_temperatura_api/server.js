const app = require("./src/app");
const environment = require("./src/config/environment");
const schedulerService = require("./src/services/schedulerService");

const port = environment.PORT;

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
	console.log(`Ambiente: ${environment.NODE_ENV}`);
	console.log(`API Version: v1`);
	schedulerService.init();
});

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
	// Para encerrar o processo em um ambiente de produção:
	// process.exit(1);
});

process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception:", error);
	// Para encerrar o processo em um ambiente de produção:
	// process.exit(1);
});
