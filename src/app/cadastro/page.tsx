"use client";
import { useState } from "react";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    plano: "BASICO",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCadastro = async () => {
    const response = await fetch("/api/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Erro no cadastro");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Cadastro</h1>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        className="mt-4 p-2 border rounded"
        value={formData.nome}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        className="mt-2 p-2 border rounded"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        className="mt-2 p-2 border rounded"
        value={formData.senha}
        onChange={handleChange}
      />
      <select
        name="plano"
        className="mt-2 p-2 border rounded"
        value={formData.plano}
        onChange={handleChange}
      >
        <option value="BASICO">Básico (R$9,90)</option>
        <option value="PADRAO">Padrão (R$29,90)</option>
        <option value="PREMIUM">Premium (R$49,90)</option>
      </select>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleCadastro}
      >
        Cadastrar
      </button>
    </div>
  );
}
