"use client";

import { useState } from "react";
import styles from "./cadastro.module.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem(""); // Limpa mensagens anteriores
    setMessageType(''); // Limpa tipo de mensagem anterior

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Usuário cadastrado com sucesso! Redirecionando...");
        setMessageType('success');

        // Login automático após o registro
        const signInResult = await signIn('credentials', {
          redirect: false, // Não redireciona automaticamente
          email,
          senha,
        });

        if (signInResult?.ok) {
          router.push('/profile'); // Redireciona para a página de perfil
        } else {
          setMensagem(signInResult?.error || "Erro ao fazer login automaticamente.");
          setMessageType('error');
        }
      } else {
        setMensagem(data.details || data.error || "Erro ao cadastrar usuário.");
        setMessageType('error');
      }
    } catch (error) {
      console.error("Erro de rede ou servidor:", error);
      setMensagem("Erro de rede ou servidor. Tente novamente.");
      setMessageType('error');
    }
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
          <p className={`${styles.mensagem} ${messageType === 'error' ? styles.error : styles.success}`}>{mensagem}</p>
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
