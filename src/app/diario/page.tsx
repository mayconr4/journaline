"use client";
import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import styles from "./diario.module.css"; // Importar CSS modular

export default function Diario() {
  // 1. Estados
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [texto, setTexto] = useState("");
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [corFundo, setCorFundo] = useState("#FFFFFF");
  const [imagemFundo, setImagemFundo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. Hook de Sessão
  const { data: session } = useSession();

  // Pega o nome do usuário para a saudação (melhoria)
  // Se a sessão for null (usuário deslogado), o fallback 'Escritor(a)' será usado.
  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "Escritor(a)";

  // 3. Funções de manipulação de estados
  function handleChange(setFunc: any) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFunc(e.target.value);
  }

  // 4. Função de salvamento (com verificação interna da sessão)
  async function salvarEntrada() {
    // Mantém a verificação de sessão APENAS para bloquear o salvamento da API
    if (!session || !session.user) {
      alert("Você precisa estar logado para salvar o diário!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/diario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          data,
          texto,
          corFundo,
          imagemFundo,
          userId: (session.user as any).id,
        }),
      });

      if (!res.ok) {
        alert("Erro ao salvar entrada");
        return;
      }

      alert("Entrada salva!");
      setTitulo("");
      setData("");
      setTexto("");
      setCorFundo("#FFFFFF");
      setImagemFundo(null);
      setMostrarOpcoes(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar entrada");
    } finally {
      setLoading(false);
    }
  }

  // 5. Renderização (Conteúdo do Diário)
  return (
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
        <h1 className={styles.saudacao}>Olá, {userName}! Seu Diário de Hoje</h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.formDiario}
        >
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
            value={data}
            onChange={handleChange(setData)}
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
            onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
            className={styles.btnDiario}
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
          >
            {mostrarOpcoes
              ? "Ocultar opções"
              : "Desbloquear opções de imagem e cor"}
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
                className={
                  styles.campo
                } /* Aplicando o estilo de campo também aqui */
              />

              <label>Imagem de Fundo (URL)</label>
              <input
                type="text"
                onChange={(e) => setImagemFundo(e.target.value)}
                placeholder="Cole a URL"
                className={
                  styles.campo
                } /* Aplicando o estilo de campo também aqui */
              />
              {imagemFundo && (
                <img
                  src={imagemFundo}
                  alt="Fundo"
                  className={styles.bgPreview}
                />
              )}
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={salvarEntrada}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.btnDiario}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Diário"}
          </motion.button>
        </form>
      </main>
    </div>
  );
}
