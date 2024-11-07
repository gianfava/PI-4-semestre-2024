const express = require("express");
require("dotenv").config();

const statsRoutes = require("./routes/statsRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use("/api/stats", statsRoutes);

app.listen(port, () => {
    console.log(`API de Análise rodando na porta ${port}`);
    console.log(
        `Usando dados ${
            process.env.USE_FAKE_DATA === "true" ? "fictícios" : "reais"
        }`
    );
});
