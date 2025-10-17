<<<<<<< HEAD
'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';

export default function Diario() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [texto, setTexto] = useState('');
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [corFundo, setCorFundo] = useState('#FFFFFF');
  const [imagemFundo, setImagemFundo] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
=======
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import styles from "./diario.module.css";

export default function Diario() {
  const { data: session } = useSession();
>>>>>>> testes

  const [titulo, setTitulo] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [texto, setTexto] = useState("");
  const [corFundo, setCorFundo] = useState("#FFF8DC");
  const [imagemFundo, setImagemFundo] = useState<string | null>(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diarios, setDiarios] = useState<any[]>([]); // Estado para armazenar todos os diários
  const [carregandoDiarios, setCarregandoDiarios] = useState(true); // Estado de carregamento

  // Função para carregar os diários do backend
  const fetchDiarios = async () => {
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
  };

  useEffect(() => {
    fetchDiarios();
  }, [session]); // Recarrega os diários quando a sessão muda

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
      fetchDiarios(); // Recarrega a lista completa de diários após salvar

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

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este diário?")) {
      return;
    }
    try {
      const res = await fetch(`/api/diario?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Diário excluído com sucesso!");
        fetchDiarios(); // Recarrega a lista de diários
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDiario = localStorage.getItem('diarioEntry');
      if (savedDiario) {
        const { titulo: savedTitulo, data: savedData, texto: savedTexto, corFundo: savedCorFundo, imagemFundo: savedImagemFundo } = JSON.parse(savedDiario);
        setTitulo(savedTitulo);
        setData(savedData);
        setTexto(savedTexto);
        setCorFundo(savedCorFundo || '#FFFFFF');
        setImagemFundo(savedImagemFundo);
      }
    }
  }, []);

  function handleSave() {
    if (typeof window !== 'undefined') {
      const diarioEntry = {
        titulo,
        data,
        texto,
        corFundo,
        imagemFundo,
      };
      localStorage.setItem('diarioEntry', JSON.stringify(diarioEntry));
      setSaveMessage('Diário salvo com sucesso!');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  }

  return (
<<<<<<< HEAD
    <div className="container">
      <main className="main-content" style={{ backgroundColor: corFundo }}>
        <h1>Seu Diário</h1>
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="success-alert"
            role="alert"
          >
            <span>{saveMessage}</span>
          </motion.div>
        )}
        <form onSubmit={e => e.preventDefault()} className="form">
          <label>Título</label>
          <input type="text" value={titulo} onChange={handleChange(setTitulo)} />
=======
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
>>>>>>> testes

        <label>Data</label>
        <input
          type="date"
          value={dataEntrada}
          onChange={handleChange(setDataEntrada)}
          className={styles.campo} /* Aplica estilo campo para consistência */
        />

        <label>Texto</label>
        <textarea
          value={texto}
          onChange={handleChange(setTexto)}
          className={styles.campo}
        />

<<<<<<< HEAD
          <motion.button
            type="button"
            onClick={handleSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Salvar Diário
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            {mostrarOpcoes ? 'Ocultar opções' : 'Desbloquear opções de imagem e cor'}
          </motion.button>
=======
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
        >
          {mostrarOpcoes
            ? "Ocultar opções"
            : "Mostrar opções de personalização"}
        </button>
>>>>>>> testes

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
              // Removido className={styles.campo} para input[type="color"]
            />

<<<<<<< HEAD
              <label>Imagem de Fundo (URL)</label>
              <input type="text" value={imagemFundo || ''} onChange={e => setImagemFundo(e.target.value)} placeholder="Cole a URL" />
              {imagemFundo && <img src={imagemFundo} alt="Fundo" className="bg-preview" />}
            </motion.div>
          )}
        </form>
      </main>
=======
            <label>Imagem de Fundo (URL)</label>
            <input
              type="text"
              value={imagemFundo ?? ""}
              onChange={(e) => setImagemFundo(e.target.value)}
              placeholder="Cole a URL da imagem"
              className={styles.campo} /* Adiciona estilo campo para input de imagem */
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
                // Removendo background color inline para usar CSS modular
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
>>>>>>> testes
    </div>
  );
}
