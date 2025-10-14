import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function Perfil() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <p>Você não está logado.</p>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Olá, {user?.nome}</h1>
      <p>{user?.email}</p>
    </main>
  );
}
