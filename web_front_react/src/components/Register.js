import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro realizado:", { cpf, name, email, password });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;