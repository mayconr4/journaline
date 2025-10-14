"use client"; // necessário para usar hooks no client

import { useState } from "react";
import { signIn } from "next-auth/react";
import "./login.css"; // seu CSS puro

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false, // não redireciona automaticamente
      email,
      senha,
    });

    if (result?.error) {
      setMensagem(result.error);
    } else {
      setMensagem("Login bem-sucedido!");
      // aqui você pode redirecionar manualmente
      // ex: window.location.href = "/diario";
    }
  }

  return (
    <main className="container">
      <form onSubmit={handleSubmit} className="formulario">
        <h1 className="titulo">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="campo"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="campo"
        />

        <button type="submit" className="botao">
          Entrar
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </main>
  );
}
