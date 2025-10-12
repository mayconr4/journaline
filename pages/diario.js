import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

export default function Diary() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [bgImage, setBgImage] = useState(null);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#333D29] font-serif">
      <Sidebar />
      <main className="flex-grow p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Seu Diário</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-[#656D4A] mb-1" htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#A4AC86] p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#936639]"
              placeholder="Insira o título da entrada"
            />
          </div>
          <div>
            <label className="block text-[#656D4A] mb-1" htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full rounded-lg border border-[#A4AC86] p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#936639]"
            />
          </div>
          <div>
            <label className="block text-[#656D4A] mb-1" htmlFor="text">Texto</label>
            <textarea
              id="text"
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full rounded-lg border border-[#A4AC86] p-3 h-40 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#936639]"
              placeholder="Escreva seus pensamentos aqui..."
            />
          </div>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="bg-[#A68A64] text-white rounded-lg px-6 py-2 hover:bg-[#936639] transition-colors"
          >
            {showOptions ? 'Ocultar opções' : 'Desbloquear opções de imagem e cor'}
          </button>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-[#656D4A] mb-1">Cor de Fundo</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-16 h-10 rounded-lg cursor-pointer border border-[#A4AC86]"
                />
              </div>
              <div>
                <label className="block text-[#656D4A] mb-1">Imagem de Fundo (URL)</label>
                <input
                  type="text"
                  onChange={e => setBgImage(e.target.value)}
                  placeholder="Cole a URL da imagem"
                  className="w-full rounded-lg border border-[#A4AC86] p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#936639]"
                />
                {bgImage && (
                  <div className="mt-3 rounded-lg overflow-hidden shadow-md">
                    <img src={bgImage} alt="Background preview" className="w-full object-cover max-h-48" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </form>
      </main>
    </div>
  );
}