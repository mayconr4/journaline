import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#333D29] font-serif">
      <Sidebar />
      <main className="flex-grow p-12 flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-6 font-semibold">Bem-vindo ao Journaline</h1>
        <p className="max-w-xl text-lg mb-10 text-[#656D4A]">
          Um diário gamificado para estimular sua criatividade e progresso pessoal.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/diary">
            <a className="bg-[#A68A64] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#936639] transition-colors">
              Ir para o Diário
            </a>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}