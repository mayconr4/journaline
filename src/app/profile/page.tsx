// app/profile/page.tsx
import { getServerSession } from "next-auth/next"; // use /next
import { prisma } from "@/lib/prisma";
import { authOptions } from "next-auth"; // tipo NextAuthOptions (opcional)

export default async function Perfil() {
  // pega a sessão do usuário logado
  const session = await getServerSession({}); // sem passar authOptions

  if (!session?.user?.email) return <p>Você não está logado.</p>;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { diarios: true },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Olá, {user?.nome}</h1>
      <h2>Suas anotações:</h2>
      <ul>
        {user?.diarios.map((d) => (
          <li key={d.id}>
            <strong>{d.titulo}</strong> — {d.data}
          </li>
        ))}
      </ul>
    </main>
  );
}
