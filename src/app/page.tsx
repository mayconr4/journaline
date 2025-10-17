"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./styles/globals.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <main className={styles.mainContent}>
        <img src="/assets/logo-diario1.png" alt="Journaline Logo" className={styles.logo} />
        <h1>Bem-vindo ao Journaline</h1>
        <p>
          Um diário gamificado para estimular sua criatividade e progresso
          pessoal.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/login" passHref>
            <button className="btn-primary">Começar a Jornada!</button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
