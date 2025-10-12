import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#333D29] font-serif">
      <Sidebar />
      <main className="flex-grow p-10 max-w-md mx-auto">
        <h1 className="text-4xl font-semibold mb-6 text-[#414833]">Entrar no Journaline</h1>
        <form className="space-y-6">
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
              placeholder="Digite sua senha"
              className="w-full p-3 border border-[#936639] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6AD90]"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#A68A64] text-white py-3 rounded-lg shadow-md hover:bg-[#936639] transition-colors"
          >
            Entrar
          </motion.button>
        </form>
      </main>
    </div>
  );
}
6. Sidebar (Menu lateral) — components/Sidebar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
const links = [
  { href: '/', label: 'Home' },
  { href: '/diary', label: 'Diário' },
  { href: '/achievements', label: 'Conquistas' },
  { href: '/profile', label: 'Perfil' },
  { href: '/settings', label: 'Configurações' },
];
export default function Sidebar() {
  const router = useRouter();
  return (
    <motion.nav
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-[#E0E0E0] text-[#414833] font-serif shadow-md rounded-r-2xl p-8 flex flex-col h-screen"
    >
      <h2 className="text-2xl font-bold mb-12 select-none">Journaline</h2>
      <ul className="space-y-4 flex-grow">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>
              <a
                className={`block py-3 px-5 rounded-xl transition-colors ${
                  router.pathname === href
                    ? 'bg-[#582F0E] text-white shadow-lg'
                    : 'hover:bg-[#B6AD90] text-[#414833]'
                }`}
              >
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}