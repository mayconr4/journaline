<<<<<<< HEAD
'use client';
import './styles/globals.css';
import Sidebar from './components/Sidebar';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }, []);

=======
// app/layout.tsx (Server Component)

import "./styles/globals.css";
// ✅ Importações do seu layout
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // NOVO
import LayoutWrapper from "./components/LayoutWrapper"; // Reimportar LayoutWrapper
import { ThemeProvider } from "./context/ThemeProvider"; // Importar ThemeProvider
// import { headers } from 'next/headers'; // REMOVIDO: Importação redundante

export const metadata = {
  title: "Journaline",
  description: "Diário gamificado",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: '/assets/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
>>>>>>> testes
  return (
    <html lang="pt-BR">
      <body>
        <link rel="icon" href="/assets/icon.png" /> {/* Favicon fallback */}
        {/* Provedor de sessão global (NextAuth) */}
        <SessionProviderWrapper>
          {/* Provedor de Tema para toda a aplicação */}
          <ThemeProvider>
            {/* O LayoutWrapper tem a lógica do Sidebar e do conteúdo */}
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
