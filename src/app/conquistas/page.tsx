'use client';
import { motion } from 'framer-motion';
import '../styles/globals.css';

interface Conquista { id: number; nome: string; desbloqueada: boolean; imagem: string; }
const conquistas: Conquista[] = [
  { id: 1, nome: 'Primeira Entrada', desbloqueada: true, imagem: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
  { id: 2, nome: '5 Entradas', desbloqueada: false, imagem: 'https://cdn-icons-png.flaticon.com/512/190/190425.png' },
  { id: 3, nome: 'Diário Completo', desbloqueada: false, imagem: 'https://cdn-icons-png.flaticon.com/512/190/190423.png' },
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
              <img src={c.imagem} alt={c.nome} className="achievement-image" />
              <h2>{c.nome}</h2>
              <p>{c.desbloqueada ? 'Desbloqueada' : 'Bloqueada'}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
