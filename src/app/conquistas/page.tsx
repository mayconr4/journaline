'use client';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import styles from "./conquistas.module.css"; // Importar CSS modular

// Para ícones, você pode integrar uma biblioteca como react-icons. Por enquanto, usaremos placeholders.
interface Conquista { id: number; nome: string; desbloqueada: boolean; descricao: string; icon: string; }

const conquistas: Conquista[] = [
  { id: 1, nome: 'Primeira Entrada', desbloqueada: true, descricao: 'Complete sua primeira entrada no diário.', icon: '✨' },
  { id: 2, nome: '5 Entradas', desbloqueada: false, descricao: 'Faça 5 entradas no seu diário.', icon: '✍️' },
  { id: 3, nome: 'Diário Completo', desbloqueada: false, descricao: 'Preencha 30 dias no seu diário.', icon: '📖' },
  { id: 4, nome: 'Despertar Criativo', desbloqueada: true, descricao: 'Escreva uma entrada com mais de 200 palavras.', icon: '💡' },
  { id: 5, nome: 'Mestre da Consistência', desbloqueada: false, descricao: 'Faça entradas por 7 dias consecutivos.', icon: '🗓️' },
  { id: 6, nome: 'Reflexão Profunda', desbloqueada: false, descricao: 'Utilize todas as opções de humor em suas entradas.', icon: '🤔' },
];

export default function Conquistas() {
  // Para simular um estado sem conquistas, você pode usar: const conquistasExemplo: Conquista[] = [];
  const hasConquistas = conquistas.length > 0;

  return (
    <main className={styles.conquistasWrapper}>
      <div className={styles.conquistasContent}>
        <h1 className={styles.titulo}>Conquistas</h1>

        {!hasConquistas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.emptyState}
          >
            <p>Nenhuma conquista ainda. Comece a escrever em seu diário para desbloquear!</p>
            {/* Adicione um botão ou link para o diário se desejar */}
          </motion.div>
        )}

        {hasConquistas && (
          <div className={styles.achievementsGrid}>
            {conquistas.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: c.id * 0.1 }}
                className={`${styles.achievement} ${c.desbloqueada ? styles.unlocked : styles.locked}`}
                whileHover={{ scale: 1.03, boxShadow: c.desbloqueada ? '0 10px 25px rgba(0, 0, 0, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.achievementIcon}>{c.icon}</span>
                <h2>{c.nome}</h2>
                <p className={styles.achievementDescription}>{c.descricao}</p>
                <span className={styles.achievementStatus}>{c.desbloqueada ? 'Desbloqueada' : 'Bloqueada'}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
