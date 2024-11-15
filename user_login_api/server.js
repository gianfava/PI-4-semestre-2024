require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 5000;

// Conexão ao MongoDB
connectDB();

// Inicialização do Servidor
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
