"use client"; // ⬅️ OBRIGATÓRIO AQUI PARA USAR HOOKS

import Sidebar from "./Sidebar"; // Assumindo que Sidebar.tsx está no mesmo diretório
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={isHomePage ? "home-page-layout" : "app-layout"}>
      {/* Lógica de ocultar o Sidebar */}
      {!isHomePage && <Sidebar />}

      {/* Aplica a classe 'full-width' para centralizar a Home */}
      <main className={`main-content ${isHomePage ? "full-width" : ""}`}>
        {children}
      </main>
    </div>
  );
}
