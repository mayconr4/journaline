// app/layout.tsx
import "./styles/globals.css";
import { ReactNode } from "react";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

export const metadata = {
  title: "Journaline",
  description: "Diário gamificado",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Provedor de sessão global (NextAuth) */}
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
