"use client"; // ✅ IMPORTANTE: Transforma em Client Component

import "./styles/globals.css";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation"; // Importa o hook para pegar a rota

// O objeto metadata precisa ser exportado separadamente em um arquivo de configuração ou no layout
// ou, se usar 'use client', as propriedades precisam ser definidas no layout.
// Para simplificar, vou manter a estrutura, mas o Next.js ignora 'metadata' em 'use client'.
// Você pode mover o metadata para um arquivo 'layout.ts' separado se desejar.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Verifica se a rota atual é a home (raiz)
  const isHomePage = pathname === "/";

  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          {/* RENDERIZAÇÃO CONDICIONAL: */}
          {/* O Sidebar SÓ será renderizado se NÃO for a página inicial (isHomePage) */}
          {!isHomePage && <Sidebar />}

          {/* Adiciona uma classe condicional para o main-content */}
          <main className={`main-content ${isHomePage ? "full-width" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

// Nota: metadata não funciona em 'use client'.
// Se precisar de SEO, crie um arquivo 'layout.ts' SÓ para o metadata e importe-o no seu layout.
