"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import styles from "./diario.module.css";

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
      const bodyContent = {
        titulo,
        data: dataEntrada,
        texto,
        corFundo,
        imagemFundo: imagemFundo || null,
      };
      console.log("Enviando dados para a API:", bodyContent);
      const res = await fetch("/api/diario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Erro ao salvar entrada: ${errorData.error || res.statusText}`);
        return;
      }

      const data = await res.json();
      setUltimoDiario(data.diario); // aqui armazenamos o último diário salvo

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
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.headerTitle}>
          Olá, {userName}! Escreva seu diário
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={handleChange(setTitulo)}
            className={styles.campo}
          />

          <label>Data</label>
          <input
            type="date"
            value={dataEntrada}
            onChange={handleChange(setDataEntrada)}
          />

          <label>Texto</label>
          <textarea value={texto} onChange={handleChange(setTexto)} className={styles.campo} />

          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
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
                placeholder="Cole a URL da imagem"
              />

              {imagemFundo && (
                <img
                  src={imagemFundo}
                  alt="Preview"
                  className={styles.bgPreview}
                />
              )}
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={salvarEntrada}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={styles.btnPrimary}
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
