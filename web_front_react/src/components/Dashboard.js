import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Simulação de dados
    const fetchData = () => {
      setTemperature((Math.random() * (35 - 15) + 15).toFixed(1)); // 15 a 35 graus
      setHumidity((Math.random() * (80 - 20) + 20).toFixed(1)); // 20% a 80%
    };
    fetchData();

    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Temperatura: {temperature ? `${temperature} °C` : "Carregando..."}</p>
      <p>Umidade do Ar: {humidity ? `${humidity} %` : "Carregando..."}</p>
    </div>
  );
}

export default Dashboard;