// app/layout.tsx (Server Component)

import "./styles/globals.css";
// ✅ Importações do seu layout
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // NOVO
import LayoutWrapper from "./components/LayoutWrapper"; // Reimportar LayoutWrapper
import { ThemeProvider } from "./context/ThemeProvider"; // Importar ThemeProvider

export const metadata = {
  title: "Journaline",
  description: "Diário gamificado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
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
