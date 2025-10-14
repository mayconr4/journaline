// app/layout.tsx (Server Component)

import "./styles/globals.css";
// 🎯 Importa do diretório components
import LayoutWrapper from "./components/LayoutWrapper";

// Metadata é permitido aqui
export const metadata = {
  title: "Journaline",
  description: "Diário gamificado",
};

// O RootLayout fornece a estrutura HTML e renderiza o Client Component.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Renderiza o LayoutWrapper que contém a lógica de rota */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
