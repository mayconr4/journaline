'use client';
import { useState, ChangeEvent } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import '../styles/globals.css';

export default function Diario() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [texto, setTexto] = useState('');
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [corFundo, setCorFundo] = useState('#FFFFFF');
  const [imagemFundo, setImagemFundo] = useState<string | null>(null);

  function handleChange(setFunc: any) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFunc(e.target.value);
  }

  return (
    <div className="container">

      <main className="main-content" style={{ backgroundColor: corFundo }}>
        <h1>Seu Diário</h1>
        <form onSubmit={e => e.preventDefault()} className="form">
          <label>Título</label>
          <input type="text" value={titulo} onChange={handleChange(setTitulo)} />

          <label>Data</label>
          <input type="date" value={data} onChange={handleChange(setData)} />

          <label>Texto</label>
          <textarea value={texto} onChange={handleChange(setTexto)} />

          <motion.button
            type="button"
            onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            {mostrarOpcoes ? 'Ocultar opções' : 'Desbloquear opções de imagem e cor'}
          </motion.button>

          {mostrarOpcoes && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="options">
              <label>Cor de Fundo</label>
              <input type="color" value={corFundo} onChange={e => setCorFundo(e.target.value)} />

              <label>Imagem de Fundo (URL)</label>
              <input type="text" onChange={e => setImagemFundo(e.target.value)} placeholder="Cole a URL" />
              {imagemFundo && <img src={imagemFundo} alt="Fundo" className="bg-preview" />}
            </motion.div>
          )}
        </form>
      </main>
    </div>
  );
}
