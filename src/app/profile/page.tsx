import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import LogoutButton from "../components/LogoutButton"; // ✅ Importe o novo botão
import { redirect } from "next/navigation"; // Importar redirect
import styles from "./profile.module.css"; // Importar CSS modular
import Link from "next/link"; // Importar Link para o botão de login/cadastro

export default async function Perfil() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login"); // Redireciona para login se não estiver logado
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // O nome é a informação que passaremos para o botão.
  const userName = user?.nome || "Usuário";
  const userEmail = user?.email || "N/A";

  return (
    <main className={styles.profileWrapper}>
      <div className={styles.profileCard}>
        <h1 className={styles.titulo}>Perfil de {userName}</h1>
        <div className={styles.infoGroup}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{userEmail}</span>
        </div>

        {/* 🎯 Inserindo o Botão de Logout com a classe do CSS modular */}
        <LogoutButton userName={userName} className={styles.logoutButton} />
      </div>
    </main>
  );
}
