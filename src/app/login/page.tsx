"use client";
<<<<<<< HEAD
import { useState, ChangeEvent, FormEvent } from "react";
// import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import "../styles/globals.css";

interface FormData {
  email: string;
  senha: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: "", senha: "" });
=======

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // 🔹 hook para navegação
import "./login.module.css";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter(); // 🔹 instância do router
>>>>>>> testes

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
<<<<<<< HEAD
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="container">
     
      <main className="main-content">
        <h1>Entrar no Journaline</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Entrar
          </motion.button>
        </form>
      </main>
    </div>
=======

  return (
    <main className={styles.formularioWrapper}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h1 className={styles.titulo}>Login</h1>

        <input
          type="email"
          placeholder="Email"
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
          Entrar
        </button>

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

        <Link href="/cadastro">
          <p>
            Não tem cadastro ainda? <b>Cadastre-se</b>
          </p>
        </Link>
      </form>
    </main>
>>>>>>> testes
  );
}
