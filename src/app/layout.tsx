// /src/app/layout.tsx
import "./globals.css"; // Importe o CSS aqui usando o caminho correto
import type { Metadata } from "next";
import Head from "next/head"; // Adicione esta linha para importar Head

export const metadata: Metadata = {
  title: "Seu Diário Online",
  description: "Um espaço seguro para registrar suas ideias.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
