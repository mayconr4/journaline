"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
<<<<<<< Updated upstream
import styles from "./diario.module.css"; // Importar CSS modular
=======
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import styles from "./diario.module.css";
>>>>>>> Stashed changes

export default function Diario() {
  const { data: session } = useSession();

  const [titulo, setTitulo] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [texto, setTexto] = useState("");
  const [corFundo, setCorFundo] = useState("#FFF8DC");
  const [imagemFundo, setImagemFundo] = useState<string | null>(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ultimoDiario, setUltimoDiario] = useState<any | null>(null);

  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Escritor(a)";

  const handleChange =
    (setter: any) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setter(e.target.value);

  async function salvarEntrada() {
    if (!session?.user?.email) {
      alert("Você precisa estar logado!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/diario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          data: dataEntrada,
          texto,
          corFundo,
          imagemFundo: imagemFundo || null,
        }),
      });

      if (!res.ok) {
        alert("Erro ao salvar entrada");
        return;
      }

      const data = await res.json();
      setUltimoDiario(data); // aqui armazenamos o último diário salvo

      // limpa o form
      setTitulo("");
      setDataEntrada("");
      setTexto("");
      setCorFundo("#FFF8DC");
      setImagemFundo(null);
      setMostrarOpcoes(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar entrada");
    } finally {
      setLoading(false);
    }
  }

  return (
<<<<<<< Updated upstream
    <div className={styles.diarioWrapper}>
      <main
        className={styles.diarioContent}
        style={{
          backgroundColor: corFundo,
          backgroundImage: imagemFundo ? `url(${imagemFundo})` : "none",
          backgroundSize: "cover",
        }}
      >
        {/* Saudação Personalizada (Mesmo para deslogados, usa o fallback 'Escritor(a)') */}
        <h1 className={styles.saudacao}>
          Olá, {userName}! Seu Diário de Hoje
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className={styles.formDiario}>
=======
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <h1 className={styles.headerTitle}>
          Olá, {userName}! Escreva seu diário
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
>>>>>>> Stashed changes
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={handleChange(setTitulo)}
            className={styles.campo}
          />

          <label>Data</label>
<<<<<<< Updated upstream
          <input type="date" value={data} onChange={handleChange(setData)} className={styles.campo} />
=======
          <input
            type="date"
            value={dataEntrada}
            onChange={handleChange(setDataEntrada)}
          />
>>>>>>> Stashed changes

          <label>Texto</label>
          <textarea value={texto} onChange={handleChange(setTexto)} className={styles.campo} />

          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
<<<<<<< Updated upstream
            className={styles.btnDiario}
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
=======
>>>>>>> Stashed changes
          >
            {mostrarOpcoes
              ? "Ocultar opções"
              : "Mostrar opções de personalização"}
          </button>

          {mostrarOpcoes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.options}
            >
              <label>Cor de Fundo</label>
              <input
                type="color"
                value={corFundo}
                onChange={(e) => setCorFundo(e.target.value)}
                className={styles.campo} /* Aplicando o estilo de campo também aqui */
              />

              <label>Imagem de Fundo (URL)</label>
              <input
                type="text"
                value={imagemFundo ?? ""}
                onChange={(e) => setImagemFundo(e.target.value)}
<<<<<<< Updated upstream
                placeholder="Cole a URL"
                className={styles.campo} /* Aplicando o estilo de campo também aqui */
=======
                placeholder="Cole a URL da imagem"
>>>>>>> Stashed changes
              />

              {imagemFundo && (
<<<<<<< Updated upstream
                <img src={imagemFundo} alt="Fundo" className={styles.bgPreview} />
=======
                <img
                  src={imagemFundo}
                  alt="Preview"
                  className={styles.bgPreview}
                />
>>>>>>> Stashed changes
              )}
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={salvarEntrada}
<<<<<<< Updated upstream
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.btnDiario}
=======
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={styles.btnPrimary}
>>>>>>> Stashed changes
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Diário"}
          </motion.button>
        </form>

        {/* 🪶 Exibição apenas do último diário salvo */}
        <section className={styles.diarioContainer}>
          {ultimoDiario ? (
            <motion.article
              key={ultimoDiario.id}
              className={styles.diarioPage}
              style={{
                backgroundColor: ultimoDiario.corFundo,
                backgroundImage: ultimoDiario.imagemFundo
                  ? `url(${ultimoDiario.imagemFundo})`
                  : "none",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className={styles.diarioTitulo}>{ultimoDiario.titulo}</h2>
              <p className={styles.diarioData}>
                {new Date(ultimoDiario.createdAt).toLocaleDateString("pt-BR")}
              </p>
              <div className={styles.diarioTexto}>{ultimoDiario.texto}</div>
            </motion.article>
          ) : (
            <p>Nenhuma entrada registrada ainda.</p>
          )}
        </section>
      </main>
    </div>
  );
}
