"use client";

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
  );
}
