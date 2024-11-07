const cron = require("node-cron");
const sensorService = require("./sensorService");

function init() {
    cron.schedule("0 * * * *", () => {
        console.log("Executando captura de dados...");
        sensorService.captureAndInsertData();
    });

    console.log("Aplicação iniciada. Aguardando próxima execução programada.");

    // Executar imediatamente na inicialização
    sensorService.captureAndInsertData();
}

module.exports = {
    init,
};
