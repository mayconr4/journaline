// /pages/index.js
import Head from "next/head";
import Link from "next/link"; // Usamos Link ao invés de <a> para navegação interna

export default function Home() {
  return (
    <>
      <Head>
        <title>Diário Online - Bem-vindo(a)!</title>
      </Head>

      <header>
        <h1>Meu Diário Digital</h1>
        <nav>
          <Link href="/login">Login</Link> |
          <Link href="/cadastro">Cadastre-se</Link>
        </nav>
      </header>

      <main>
        <h2>Capture Seus Pensamentos. A Qualquer Hora, em Qualquer Lugar.</h2>
        <p>
          Um espaço seguro para registrar suas ideias, memórias e reflexões
          diárias.
        </p>
        <p>Junte-se a nós hoje!</p>
        <Link href="/cadastro" passHref>
          <button>Começar Agora</button>
        </Link>
      </main>

      <footer>
        <p>&copy; 2025 Diário Online. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
