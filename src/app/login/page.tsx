"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // 🔹 hook para navegação
import "./login.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter(); // 🔹 instância do router

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false, // não redireciona automaticamente
      email,
      senha,
    });

    if (result?.error) {
      setMensagem("Email ou senha incorretos");
    } else {
      setMensagem("Login bem-sucedido!");
      router.push("/profile"); // 🔹 redireciona para a página de perfil
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

        <Link href="/cadastro">
          <p>
            Não tem cadastro ainda? <b>Cadastre-se</b>
          </p>
        </Link>
      </form>
    </main>
  );
}
