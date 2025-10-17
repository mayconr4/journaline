"use client"; // ⬅️ OBRIGATÓRIO para usar hooks do NextAuth

import { signOut } from "next-auth/react";
import React from "react";
// import styles from "../profile/profile.module.css"; // REMOVIDO: LogoutButton não precisa de estilos específicos de profile

// Recebemos o nome do usuário como prop apenas para a mensagem de confirmação
export default function LogoutButton({ userName, className }: { userName: string; className?: string }) {
  const handleLogout = () => {
    if (window.confirm(`Tem certeza que deseja sair, ${userName}?`)) {
      // 1. Chama a função signOut
      // 2. 'callbackUrl: "/"' garante que o usuário seja redirecionado para a home (/) após o logout
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button
      className={`btn-primary ${className || ''}`} // Combina a classe global com a prop
      onClick={handleLogout}
      // style={{ marginTop: "1.5rem" }} // Removido, se precisar, adicionar via className
    >
      Sair (Logout)
    </button>
  );
}
