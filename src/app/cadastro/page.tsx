"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./cadastro.module.css"; // importa o CSS module

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await res.json();
    setMensagem(data.error || "Usuário cadastrado com sucesso!");
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Cadastrar</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.buttonPrimary}>
          Cadastrar
        </button>

        <Link href="/login" className={styles.buttonSecondary}>
          Voltar para o login
        </Link>

        {mensagem && <p className={styles.message}>{mensagem}</p>}
      </form>
    </main>
  );
}
