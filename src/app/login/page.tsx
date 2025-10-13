"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import "../styles/globals.css";

interface FormData {
  email: string;
  senha: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      senha: formData.senha,
    });

    if (res?.error) {
      alert("Email ou senha incorretos");
      setLoading(false);
      return;
    }

    // redireciona após login bem-sucedido
    window.location.href = "/diario";
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
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>
      </main>
    </div>
  );
}
