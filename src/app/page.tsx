// /pages/_app.tsx

import "../styles/globals.css";
import Head from "next/head";
// Importamos o tipo AppProps do Next.js
import type { AppProps } from "next/app";

// Aplicamos o tipo AppProps à função MyApp. Isso resolve o erro de tipagem.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Adiciona as fontes globais */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
