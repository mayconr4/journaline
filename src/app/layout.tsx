// app/layout.tsx (Server Component)

import "./styles/globals.css";
// ✅ Importações do seu layout
import LayoutWrapper from "./components/LayoutWrapper";
import SessionProviderWrapper from "./components/SessionProviderWrapper"; // NOVO

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
        {/* ENVOLVE TUDO NO PROVEDOR DE SESSÃO */}
        <SessionProviderWrapper>
          {/* O LayoutWrapper tem a lógica do Sidebar */}
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
