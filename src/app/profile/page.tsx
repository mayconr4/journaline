import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "lib/prisma";
import LogoutButton from "../components/LogoutButton"; // ✅ Importe o novo botão
export default async function Perfil() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    // Se o usuário não estiver logado, redirecione ou exiba uma mensagem simples.
    // Para um redirecionamento forçado, use o hook 'redirect' do Next.js.
    // Ex: redirect('/login'); (Se for um Server Component)

    // Por enquanto, apenas exibimos a mensagem:
    return <p>Você não está logado. Faça login para ver seu perfil.</p>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // O nome é a informação que passaremos para o botão.
  const userName = user?.nome || "Usuário";

  return (
    <main style={{ padding: "2rem" }} className="container">
      <Sidebar />
      <h1>Perfil de {userName}</h1>
      <p>Email: {user?.email}</p>

      {/* 🎯 Inserindo o Botão de Logout */}
      <LogoutButton userName={userName} />
    </main>
  );
}
