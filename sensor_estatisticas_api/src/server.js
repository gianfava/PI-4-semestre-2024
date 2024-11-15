const app = require("./app");
const config = require("./config/config");

app.listen(config.port, () => {
	console.log(`API de Análise rodando na porta ${config.port}`);
	console.log(`Usando dados ${config.useFakeData ? "fictícios" : "reais"}`);
});
