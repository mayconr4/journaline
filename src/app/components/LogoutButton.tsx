"use client"; // ⬅️ OBRIGATÓRIO para usar hooks do NextAuth

import { signOut } from "next-auth/react";
import React from "react";

// Recebemos o nome do usuário como prop apenas para a mensagem de confirmação
export default function LogoutButton({ userName }: { userName: string }) {
  const handleLogout = () => {
    if (window.confirm(`Tem certeza que deseja sair, ${userName}?`)) {
      // 1. Chama a função signOut
      // 2. 'callbackUrl: "/"' garante que o usuário seja redirecionado para a home (/) após o logout
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button
      className="btn-primary" // Reutiliza o estilo do seu botão
      onClick={handleLogout}
      style={{ marginTop: "1.5rem" }} // Adiciona um espaçamento
    >
      Sair (Logout)
    </button>
  );
}
