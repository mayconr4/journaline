"use client";

import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import styles from "./diario.module.css";

// Interface para tipar os diários
interface DiarioEntry {
  id: string;
  titulo: string;
  texto: string;
  imagemFundo?: string | null;
  createdAt: string;
}

export default function Diario() {
  const { data: session } = useSession();

  const [titulo, setTitulo] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [texto, setTexto] = useState("");
  const [corFundo, setCorFundo] = useState("#FFF8DC");
  const [imagemFundo, setImagemFundo] = useState<string | null>(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diarios, setDiarios] = useState<DiarioEntry[]>([]);
  const [carregandoDiarios, setCarregandoDiarios] = useState(true);

  // Função para carregar os diários do backend
  const fetchDiarios = useCallback(async () => {
    if (!session?.user?.email) {
      setCarregandoDiarios(false);
      return;
    }
    setCarregandoDiarios(true);
    try {
      const res = await fetch("/api/diario");
      if (res.ok) {
        const data = await res.json();
        setDiarios(data.diarios);
      } else {
        console.error("Erro ao carregar diários:", await res.json());
      }
    } catch (error) {
      console.error("Erro de rede ao carregar diários:", error);
    } finally {
      setCarregandoDiarios(false);
    }
  }, [session]);

  useEffect(() => {
    fetchDiarios();
  }, [fetchDiarios]);

  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Escritor(a)";

  // Função genérica para inputs e textarea
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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

      await res.json();
      fetchDiarios();

      // Limpar formulário
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

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este diário?")) return;

    try {
      const res = await fetch(`/api/diario?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Diário excluído com sucesso!");
        fetchDiarios();
      } else {
        const errorData = await res.json();
        console.error("Erro ao excluir diário:", errorData);
        alert(`Erro ao excluir diário: ${errorData.error || res.statusText}`);
      }
    } catch (error) {
      console.error("Erro de rede ao excluir diário:", error);
      alert("Erro de rede ao excluir diário.");
    }
  }

  return (
    <div className={styles.diarioPageWrapper}>
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
          className={styles.campo}
        />

        <label>Texto</label>
        <textarea
          value={texto}
          onChange={handleChange(setTexto)}
          className={styles.campo}
        />

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
            />

            <label>Imagem de Fundo (URL)</label>
            <input
              type="text"
              value={imagemFundo ?? ""}
              onChange={(e) => setImagemFundo(e.target.value)}
              placeholder="Cole a URL da imagem"
              className={styles.campo}
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

      <section className={styles.diarioContainer}>
        {carregandoDiarios ? (
          <p>Carregando diários...</p>
        ) : diarios.length === 0 ? (
          <p>Nenhuma entrada registrada ainda.</p>
        ) : (
          diarios.map((diario) => (
            <motion.article
              key={diario.id}
              className={styles.diarioPage}
              style={{
                backgroundImage: diario.imagemFundo
                  ? `url(${diario.imagemFundo})`
                  : "none",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className={styles.diarioTitulo}>{diario.titulo}</h2>
              <p className={styles.diarioData}>
                {new Date(diario.createdAt).toLocaleDateString("pt-BR")}
              </p>
              <div className={styles.diarioTexto}>{diario.texto}</div>
              <button
                type="button"
                onClick={() => handleDelete(diario.id)}
                className={styles.btnExcluir}
              >
                Excluir
              </button>
            </motion.article>
          ))
        )}
      </section>
    </div>
  );
}
