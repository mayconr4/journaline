'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import '../styles/globals.css';

interface FormData { nome: string; email: string; senha: string; }

export default function Cadastro() {
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', senha: '' });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: FormEvent) { e.preventDefault(); }

  return (
    <div className="container">
    
      <main className="main-content">
        <h1>Junte-se ao Journaline!</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>Nome</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Senha</label>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} />

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
            Cadastre-se
          </motion.button>
        </form>
      </main>
    </div>
  );
}
