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
