import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const achievements = [
  { id: 1, name: 'Primeira Entrada', unlocked: true },
  { id: 2, name: '5 Entradas', unlocked: false },
  { id: 3, name: 'Diário Completo', unlocked: false },
];

export default function Achievements() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#333D29] font-serif">
      <Sidebar />
      <main className="flex-grow p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Conquistas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: achievement.id * 0.1 }}
              className={`p-6 rounded-lg shadow-md ${
                achievement.unlocked
                  ? 'bg-[#A68A64] text-white'
                  : 'bg-[#E0E0E0] text-[#656D4A] opacity-60'
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{achievement.name}</h2>
              <p>{achievement.unlocked ? 'Desbloqueada' : 'Bloqueada'}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}