'use client';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import '../styles/globals.css';

interface Conquista { id: number; nome: string; desbloqueada: boolean; }
const conquistas: Conquista[] = [
  { id: 1, nome: 'Primeira Entrada', desbloqueada: true },
  { id: 2, nome: '5 Entradas', desbloqueada: false },
  { id: 3, nome: 'Diário Completo', desbloqueada: false },
];

export default function Conquistas() {
  return (
    <div className="container">
      
      <main className="main-content">
        <h1>Conquistas</h1>
        <div className="achievements-grid">
          {conquistas.map(c => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: c.id * 0.1 }}
              className={`achievement ${c.desbloqueada ? 'unlocked' : 'locked'}`}
            >
              <h2>{c.nome}</h2>
              <p>{c.desbloqueada ? 'Desbloqueada' : 'Bloqueada'}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
