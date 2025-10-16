"use client"; // ⬅️ OBRIGATÓRIO AQUI PARA USAR HOOKS

import Sidebar from "./Sidebar"; // Assumindo que Sidebar.tsx está no mesmo diretório
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // Importe useState e useEffect

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Exemplo: telas menores que 768px são consideradas pequenas
    };

    // Executa uma vez na montagem do componente
    checkScreenSize();

    // Adiciona um listener para o evento de redimensionamento da janela
    window.addEventListener("resize", checkScreenSize);

    // Limpa o listener quando o componente é desmontado
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={isHomePage ? "home-page-layout" : "app-layout"}>
      {/* Lógica de ocultar o Sidebar: oculta na home, e no login se for tela pequena */}
      {(!isHomePage && !isLoginPage) || (isLoginPage && !isSmallScreen) ? <Sidebar /> : null}

      {/* Aplica a classe 'full-width' para centralizar a Home */}
      <main className={`main-content ${isHomePage ? "full-width" : ""}`}>
        {children}
      </main>
    </div>
  );
}
