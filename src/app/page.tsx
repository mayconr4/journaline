'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import './styles/globals.css';

export default function Home() {
  return (
    <div className="container">
     
      <main className="main-content">
        <h1>Bem-vindo ao Journaline</h1>
        <p>Um diário gamificado para estimular sua criatividade e progresso pessoal.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/diario">
            <button className="btn-primary">Ir para o Diário</button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
