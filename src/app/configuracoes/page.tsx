"use client";
<<<<<<< HEAD
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/globals.css";

interface SettingsData {
  name: string;
  email: string;
  theme: "light" | "dark";
}

export default function Configuracoes() {
  const [settings, setSettings] = useState<SettingsData>(() => {
    // Carrega o tema do localStorage ao iniciar
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    return {
      name: "Nome do Usuário",
      email: "usuario@email.com",
      theme:
        savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light",
    };
  });
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Aplica a classe ao body quando o tema muda
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.className = settings.theme === "dark" ? "dark-theme" : "";
    }
  }, [settings.theme]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value as "light" | "dark",
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", settings.theme);
    }
    setSaveMessage("Configurações salvas com sucesso!");
    setTimeout(() => setSaveMessage(null), 3000);
  }

  return (
    <div className="container">
      <main className="main-content">
        <h1 className="">Configurações</h1>

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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="settings-card"
        >
          <form onSubmit={handleSubmit} className="form">
            <div className="">
              <label
                className="form-label"
                htmlFor="name"
              >
                Nome:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={settings.name}
                onChange={handleChange}
                className="profile-input"
              />
            </div>

            <div className="">
              <label
                className="form-label"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                className="profile-input"
              />
            </div>

            <div className="">
              <label
                className="form-label"
                htmlFor="theme"
              >
                Tema:
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Salvar Configurações
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
=======

import { useState } from "react";
import styles from "./configuracoes.module.css";
import { useTheme } from "../context/ThemeProvider"; // Importar useTheme

export default function ConfiguracoesPage() {
  // const [notificacoes, setNotificacoes] = useState(true); // Removido, tema gerenciado pelo contexto
  // const [tema, setTema] = useState("claro"); // Removido
  const { theme, setTheme } = useTheme(); // Usar o hook useTheme
  const [notificacoes, setNotificacoes] = useState(true); // Manter notificações local

  function handleSave() {
    // Lógica para salvar configurações (o tema já é salvo no localStorage via ThemeProvider)
    alert("Configurações salvas!");
  }

  return (
    <main className={styles.configWrapper}>
      <div className={styles.configCard}>
        <h1 className={styles.titulo}>Configurações</h1>

        <div className={styles.settingGroup}>
          <label htmlFor="notificacoes" className={styles.settingLabel}>
            Notificações:
          </label>
          <input
            type="checkbox"
            id="notificacoes"
            checked={notificacoes}
            onChange={() => setNotificacoes(!notificacoes)}
            className={styles.checkbox}
          />
        </div>

        <div className={styles.settingGroup}>
          <label htmlFor="tema" className={styles.settingLabel}>
            Tema:
          </label>
          <select
            id="tema"
            value={theme} // Usar o tema do contexto
            onChange={(e) => setTheme(e.target.value)} // Atualizar o tema via contexto
            className={styles.select}
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </div>

        <button onClick={handleSave} className={styles.botao}>
          Salvar Configurações
        </button>
      </div>
    </main>
>>>>>>> testes
  );
}
