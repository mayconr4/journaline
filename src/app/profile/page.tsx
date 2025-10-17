import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import LogoutButton from "../components/LogoutButton";
import { redirect } from "next/navigation";
import styles from "./profile.module.css";
import Link from "next/link";

export default async function Perfil() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // 🔹 Buscar o usuário junto com os diários
  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    include: { diarios: true }, // <- inclui os diários relacionados
  });

  if (!user) {
    return (
      <div className={styles.profileCard}>
        <h1 className={styles.titulo}>Usuário não encontrado</h1>
        <p className={styles.infoValue}>
          Não foi possível carregar os dados do seu perfil.
        </p>
        <Link href="/login" passHref>
          <p className={styles.linkLogin}>Tentar login novamente</p>
        </Link>
      </div>
    );
  }

  const userName = user.nome || "Usuário";
  const userEmail = user.email || "N/A";
  const diarios = user.diarios;

  return (
    <div className={styles.profileCard}>
      <h1 className={styles.titulo}>Perfil de {userName}</h1>
      <div className={styles.infoGroup}>
        <span className={styles.infoLabel}>Email:</span>
        <span className={styles.infoValue}>{userEmail}</span>
      </div>

      <LogoutButton userName={userName} className={styles.logoutButton} />

      {/* 🔹 Lista de diários do usuário */}
      <div className={styles.diariosSection}>
        <h2 className={styles.subtitulo}>Seus Diários</h2>

        {diarios.length === 0 ? (
          <p className={styles.infoValue}>
            Você ainda não criou nenhum diário.
          </p>
        ) : (
          <ul className={styles.diarioList}>
            {diarios.map((diario) => (
              <li key={diario.id} className={styles.diarioCard}>
                <h3 className={styles.diarioTitulo}>{diario.titulo}</h3>
                <p className={styles.diarioData}>📅 {diario.data}</p>
                <p className={styles.diarioTexto}>
                  {diario.texto.length > 120
                    ? diario.texto.substring(0, 120) + "..."
                    : diario.texto}
                </p>

                {/* 🔗 Link para a página do diário */}
                <Link
                  href={`/diario/${diario.id}`}
                  className={styles.verMaisLink}
                >
                  Ler diário completo →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
