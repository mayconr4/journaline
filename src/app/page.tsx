// /pages/_app.tsx

import "./globals.css";
import Head from "next/head";
// Importamos o tipo AppProps do Next.js
import type { AppProps } from "next/app";

// Aplicamos o tipo AppProps à função MyApp. Isso resolve o erro de tipagem.
export default function Home() {
  return (
    <main>
      <h1>Bem-vindo ao Journaline!</h1>
      <p>Este é o conteúdo da sua página inicial.</p>
    </main>
  );
}
