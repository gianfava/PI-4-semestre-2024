const { exec } = require("child_process");
const cron = require("node-cron");
const sensorService = require("../api/v1/services/sensorService");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const VENV_PYTHON = path.join(PROJECT_ROOT, "venv/bin/python");
const SCRIPT_PATH = path.join(__dirname, "update_display.py");

// Função para executar o script Python
function runPythonScript(temperature, humidity) {
	return new Promise((resolve, reject) => {
		exec(
			`${VENV_PYTHON} ${SCRIPT_PATH} ${temperature} ${humidity}`,
			{
				cwd: PROJECT_ROOT,
			},
			(error, stdout, stderr) => {
				if (error) {
					console.error(`Erro ao executar o script Python: ${error}`);
					return reject(error);
				}
				if (stderr) {
					console.warn(`Aviso do script Python: ${stderr}`);
				}
				resolve(stdout);
			}
		);
	});
}

// Função para atualizar a tela
async function updateDisplay() {
	try {
		const { temperatura, umidade } = await sensorService.getCurrentSensorData();
		await runPythonScript(temperatura.toFixed(1), umidade.toFixed(1));
		console.log(
			`Tela atualizada: Temperatura ${temperatura.toFixed(
				1
			)}°C, Umidade ${umidade.toFixed(1)}%`
		);
	} catch (error) {
		console.error("Erro ao atualizar a tela:", error);
	}
}

// Função para iniciar o agendamento
function init() {
	// Agendar a atualização da tela a cada minuto
	const task = cron.schedule("* * * * *", updateDisplay, {
		scheduled: true,
		timezone: "America/Sao_Paulo", // Ajuste para seu fuso horário
	});

	console.log("Agendador de atualização da tela iniciado.");

	// Executar imediatamente na inicialização
	updateDisplay();

	// Retornar a tarefa para possível cancelamento futuro
	return task;
}

module.exports = {
	init,
	updateDisplay,
};
