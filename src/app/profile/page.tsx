import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import LogoutButton from "../components/LogoutButton";
import { redirect } from 'next/navigation';
import styles from "./profile.module.css"; // Importar CSS modular
import Link from "next/link";

export default async function Perfil() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string }, // Garantir que email é string
  });

  if (!user) {
    return (
      <div className={styles.profileCard}>
        <h1 className={styles.titulo}>Usuário não encontrado</h1>
        <p className={styles.infoValue}>Não foi possível carregar os dados do seu perfil.</p>
        <Link href="/login" passHref>
          <p className={styles.linkLogin}>
            Tentar login novamente
          </p>
        </Link>
      </div>
    );
  }

  const userName = user?.nome || "Usuário";
  const userEmail = user?.email || "N/A";

  return (
    <div className={styles.profileCard}>
      <h1 className={styles.titulo}>Perfil de {userName}</h1>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Email:</span>
        <span className={styles.infoValue}>{userEmail}</span>
      </div>

      <LogoutButton userName={userName} className={styles.logoutButton} />
    </div>
  );
}
