"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Substituir com lógica real de autenticação
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    if (response.ok) {
      router.push("/app"); // Redireciona para a área logada
    } else {
      alert("Login inválido!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="E-mail"
        className="mt-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="mt-2 p-2 border rounded"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Entrar
      </button>
    </div>
  );
}
