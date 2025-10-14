"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import "./styles/globals.css";
import styles from "./page.module.css"; // ✅ importar como módulo

export default function Home() {
  return (
    <div className="container">
      <main className={styles.mainContent}>
        <h1>Bem-vindo ao Journaline</h1>
        <p>
          Um diário gamificado para estimular sua criatividade e progresso
          pessoal.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/login">
            <button className="btn-primary">Ir para o login</button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
