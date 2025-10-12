import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#333D29] font-serif">
      <Sidebar />
      <main className="flex-grow p-10 max-w-md mx-auto">
        <h1 className="text-4xl font-semibold mb-6 text-[#582F0E]">Junte-se ao Journaline!</h1>
        <p className="mb-8 text-[#A68A64]">
          Um diário gamificado para transformar seus dias com criatividade e progresso. Cadastre-se e comece sua jornada!
        </p>
        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-[#656D4A]" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full p-3 border border-[#936639] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6AD90]"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#656D4A]" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full p-3 border border-[#936639] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6AD90]"
            />
          </div>
          <div>
            <label className="block mb-1 text-[#656D4A]" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crie uma senha"
              className="w-full p-3 border border-[#936639] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6AD90]"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#A68A64] text-white py-3 rounded-lg shadow-md hover:bg-[#936639] transition-colors"
          >
            Cadastre-se
          </motion.button>
        </form>
      </main>
    </div>
  );
}