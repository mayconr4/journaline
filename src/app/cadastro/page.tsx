"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import "../styles/globals.css";

interface FormData {
  nome: string;
  email: string;
  senha: string;
}

export default function Cadastro() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao cadastrar");
        setLoading(false);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      setFormData({ nome: "", email: "", senha: "" }); // limpa o formulário
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <main className="main-content">
        <h1>Junte-se ao Journaline!</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />

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
            {loading ? "Cadastrando..." : "Cadastre-se"}
          </motion.button>
        </form>
      </main>
    </div>
  );
}
