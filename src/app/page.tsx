"use client";

import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image"; // Importe o componente Image
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import "./styles/globals.css";
=======
import { motion } from "framer-motion";
import "./styles/globals.css";
import styles from "./page.module.css";
>>>>>>> testes

export default function Home() {
  return (
    <div className="container">
<<<<<<< HEAD
      <main className="main-content">
=======
      <main className={styles.mainContent}>
        <img src="/assets/logo-diario1.png" alt="Journaline Logo" className={styles.logo} />
>>>>>>> testes
        <h1>Bem-vindo ao Journaline</h1>
        <p>
          Um diário gamificado para estimular sua criatividade e progresso
          pessoal.
        </p>
<<<<<<< HEAD

        {/* Logo Centralizado */}
        

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/diario">
            <button className="btn-primary">Ir para o Diário</button>
=======
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/login" passHref>
            <button className="btn-primary">Começar a Jornada!</button>
>>>>>>> testes
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
