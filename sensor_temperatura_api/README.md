# Sensor DHT11 Data Capture API

## Visão Geral

Esta aplicação Node.js captura dados de temperatura e umidade de um sensor DHT11 conectado a um Raspberry Pi (ou dispositivo similar). Ela fornece uma API RESTful para acessar os dados em tempo real e os dados históricos armazenados em um banco de dados PostgreSQL.

## Funcionalidades

- Captura periódica de dados de temperatura e umidade do sensor DHT11
- Armazenamento dos dados capturados em um banco de dados PostgreSQL
- API RESTful para acessar dados em tempo real e históricos
- Agendamento automático de captura de dados a cada hora

## Pré-requisitos

- Node.js (v12 ou superior)
- PostgreSQL
- Raspberry Pi (ou dispositivo similar) com sensor DHT11 conectado

## Instalação

1. Clone o repositório:

   git clone https://github.com/seu-usuario/sensor-dht11-api.git

   cd sensor-dht11-api

2. Instale as dependências:

   npm install

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

   DB_USER=seu_usuario_postgres

   DB_HOST=seu_host_postgres

   DB_NAME=seu_banco_de_dados

   DB_PASSWORD=sua_senha_postgres

   DB_PORT=5432

   PORT=3000

4. Configure o banco de dados PostgreSQL executando o seguinte SQL:
```sql
CREATE TABLE sensor_dht11_dados (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    temperatura DECIMAL(5,2) NOT NULL,
    umidade DECIMAL(5,2) NOT NULL
);
```

## Configuração do Hardware
Certifique-se de que o sensor DHT11 esteja corretamente conectado ao seu Raspberry Pi. Por padrão, o código assume que o sensor está conectado ao GPIO 22. Se necessário, ajuste a variável sensorPin no arquivo app.js.

## Uso

Inicie a aplicação:

`node app.js`


A aplicação começará a capturar dados do sensor DHT11 a cada hora e os armazenará no banco de dados.

Acesse os endpoints da API:

Dados em tempo real do sensor: GET http://localhost:3000/sensor

Dados históricos (últimos 100 registros): GET http://localhost:3000/dados



## Endpoints da API

GET /sensor: Retorna os dados atuais de temperatura e umidade do sensor DHT11.

GET /dados: Retorna os últimos 100 registros de dados armazenados no banco de dados.

## Personalização

Para alterar a frequência de captura de dados, modifique a configuração do cron job no arquivo app.js.
Para ajustar o número de registros retornados pelo endpoint /dados, modifique a consulta SQL na função correspondente.

## Solução de Problemas

Se encontrar problemas com a conexão do sensor, verifique as conexões físicas e certifique-se de que o número do pino GPIO está correto no código.
Para problemas de conexão com o banco de dados, verifique as credenciais no arquivo .env e certifique-se de que o PostgreSQL está em execução.

