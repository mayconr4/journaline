"use client";

import { useState } from "react";
import styles from "./cadastro.module.css";
import Link from "next/link"; // Importar Link para o botão de login

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
    <main className={styles.cadastroWrapper}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h1 className={styles.titulo}>Cadastrar</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.campo}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.campo}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.campo}
        />

        <button type="submit" className={styles.botao}>
          Cadastrar
        </button>

        {mensagem && (
          <p className={styles.mensagem}>{mensagem}</p>
        )}

        <Link href="/login" passHref>
          <p className={styles.linkLogin}>
            Já tem cadastro? <b>Faça login</b>
          </p>
        </Link>
      </form>
    </main>
  );
}
