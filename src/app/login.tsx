// /pages/login.js
import Head from "next/head";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Diário Online</title>
      </Head>

      <header>
        <h1>Acesse sua conta</h1>
      </header>

      <main>
        {/* Lembre-se: em JSX, a tag <label> usa 'htmlFor' ao invés de 'for' */}
        <form action="/api/processar_login" method="POST">
          <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>
          Esqueceu sua senha?{" "}
          <Link href="/recuperar-senha">Recuperar Senha</Link>
        </p>
        <p>
          Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>.
        </p>
      </main>
    </>
  );
}
