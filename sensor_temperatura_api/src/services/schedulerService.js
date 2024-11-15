const cron = require('node-cron');
const sensorService = require('../api/v1/services/sensorService');

function init() {
  cron.schedule('0 * * * *', async () => {
    console.log('Executando captura de dados...');
    await sensorService.captureAndInsertData();
  });

  console.log('Agendador iniciado. Aguardando próxima execução programada.');
  
  // Executar imediatamente na inicialização
  sensorService.captureAndInsertData();
}

module.exports = {
  init
};