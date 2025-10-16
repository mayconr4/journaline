"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./conquistas.module.css";
import { getSession } from "next-auth/react";
import { fetchUsuario } from "@/lib/fetchUsuario";

// Para ícones, você pode integrar uma biblioteca como react-icons. Por enquanto, usaremos placeholders.
interface Conquista {
  id: number;
  nome: string;
  desbloqueada: boolean;
  descricao: string;
  icon: string;
  pointsRequired: number;
}

const allConquistas: Omit<Conquista, "desbloqueada">[] = [
  {
    id: 1,
    nome: "Primeira Entrada",
    descricao: "Complete sua primeira entrada no diário.",
    icon: "✨",
    pointsRequired: 0,
  }, // Começa desbloqueada (0 pontos)
  {
    id: 2,
    nome: "5 Entradas",
    descricao: "Faça 5 entradas no seu diário.",
    icon: "✍️",
    pointsRequired: 30,
  },
  {
    id: 3,
    nome: "Mais um nível conquistado",
    descricao: "Desbloqueie a personalização do fundo do seu diário!",
    icon: "🎨",
    pointsRequired: 60,
  },
  {
    id: 4,
    nome: "Despertar Criativo",
    descricao: "Escreva uma entrada com mais de 200 palavras.",
    icon: "💡",
    pointsRequired: 90,
  },
  {
    id: 5,
    nome: "Desbloqueia adicionar imagem",
    descricao: "Desbloqueie a opção de adicionar imagens às suas entradas!",
    icon: "🖼️",
    pointsRequired: 120,
  },
  {
    id: 6,
    nome: "Reflexão Profunda",
    descricao: "Utilize todas as opções de humor em suas entradas.",
    icon: "🤔",
    pointsRequired: 150,
  },
];

export default function Conquistas() {
  const [userPoints, setUserPoints] = useState(0);
  const [userNivel, setUserNivel] = useState(1);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);

  useEffect(() => {
    const atualizarConquistas = allConquistas.map((c) => ({
      ...c,
      desbloqueada: userPoints >= c.pointsRequired,
    }));
    setConquistas(atualizarConquistas);
  }, [userPoints]);

  useEffect(() => {
    async function carregarUsuario() {
      const usuario = await fetchUsuario();
      if (usuario) {
        setUserPoints(usuario.pontos ?? 0);
        setUserNivel(usuario.nivel ?? 1);
      }
    }
    carregarUsuario();
  }, []);

  const hasConquistas = conquistas.length > 0;

  return (
    <main className={styles.conquistasWrapper}>
      <div className={styles.conquistasContent}>
        <h1 className={styles.titulo}>Conquistas</h1>
        <p className={styles.pointsDisplay}>
          Seus Pontos: {userPoints} | Nível: {userNivel}
        </p>

        {!hasConquistas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.emptyState}
          >
            <p>
              Nenhuma conquista ainda. Comece a escrever em seu diário para
              desbloquear!
            </p>
            {/* Adicione um botão ou link para o diário se desejar */}
          </motion.div>
        )}

        {hasConquistas && (
          <div className={styles.achievementsGrid}>
            {conquistas.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: c.id * 0.1 }}
                className={`${styles.achievement} ${
                  c.desbloqueada ? styles.unlocked : styles.locked
                }`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: c.desbloqueada
                    ? "0 10px 25px rgba(0, 0, 0, 0.2)"
                    : "0 5px 15px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.achievementIcon}>{c.icon}</span>
                <h2>{c.nome}</h2>
                <p className={styles.achievementDescription}>{c.descricao}</p>
                <span className={styles.achievementStatus}>
                  {c.desbloqueada ? "Desbloqueada" : "Bloqueada"}
                </span>

                {c.desbloqueada && (c.id === 3 || c.id === 5) && (
                  <span className={styles.unlockedFeatureIndicator}>
                    {c.id === 3
                      ? "Fundo Desbloqueado! 🎨"
                      : "Imagens Desbloqueadas! 🖼️"}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
