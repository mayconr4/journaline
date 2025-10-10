// /pages/configuracoes.tsx
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Configuracoes: React.FC = () => {
  return (
    <>
      <Head>
        <title>Configurações do Perfil - Diário Online</title>
      </Head>

      <header>
        <h1>Configurações da Conta</h1>
        <nav>
          {/* O 'Link' no Next.js substitui o <a> para navegação interna */}
          <Link href="/diario" passHref>
            Meu Diário
          </Link>{" "}
          |
          <Link href="/home" passHref>
            Sair
          </Link>
        </nav>
      </header>

      <main>
        {/* Seção 1: Informações do Usuário */}
        <section id="info-usuario">
          <h2>Dados Pessoais</h2>
          {/* O 'action' apontaria para uma API Route para atualizar o perfil */}
          <form action="/api/atualizar_perfil" method="POST">
            <div>
              <label htmlFor="nome">Nome de Usuário:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                defaultValue="[Nome do Usuário Atual]" // Usamos defaultValue para valores iniciais no React
                required
              />
            </div>

            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue="[email@atual.com]"
                required
              />
            </div>

            <div>
              <label htmlFor="data-cadastro">Membro Desde:</label>
              {/* Campos de informação sem interação são desabilitados */}
              <input
                type="text"
                id="data-cadastro"
                defaultValue="10 de Outubro de 2024"
                disabled
              />
            </div>

            <button type="submit">Atualizar Perfil</button>
          </form>
        </section>

        <hr />

        {/* Seção 2: Segurança */}
        <section id="seguranca">
          <h2>Segurança</h2>
          <form action="/api/atualizar_senha" method="POST">
            <div>
              <label htmlFor="senha-atual">Senha Atual:</label>
              <input
                type="password"
                id="senha-atual"
                name="senha_atual"
                required
              />
            </div>

            <div>
              <label htmlFor="nova-senha">Nova Senha:</label>
              <input
                type="password"
                id="nova-senha"
                name="nova_senha"
                required
              />
            </div>

            <div>
              <label htmlFor="confirma-nova-senha">
                Confirme a Nova Senha:
              </label>
              <input
                type="password"
                id="confirma-nova-senha"
                name="confirma_nova_senha"
                required
              />
            </div>

            <button type="submit">Mudar Senha</button>
          </form>
        </section>

        <hr />

        {/* Seção 3: Zona de Perigo */}
        <section id="zona-perigo">
          <h2>Gerenciamento da Conta</h2>
          <p>
            Se você deseja desativar ou excluir permanentemente sua conta,
            clique no botão abaixo.
          </p>
          {/* O estilo em linha foi ajustado apenas para este botão de "perigo" */}
          <button
            type="button" // Use type="button" para evitar submissão de formulário
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              marginTop: "15px",
            }}
          >
            Excluir Conta Permanentemente
          </button>
        </section>
      </main>
    </>
  );
};

export default Configuracoes;
