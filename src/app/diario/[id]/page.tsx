import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "../diario.module.css";
import Link from "next/link";

interface DiarioPageProps {
  params: { id: string };
}

export default async function DiarioPage({ params }: DiarioPageProps) {
  const diario = await prisma.diario.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!diario) {
    notFound();
  }

  return (
    <div
      className={styles.pageContainer}
      style={{ backgroundColor: diario.corFundo }}
    >
      <div className={styles.card}>
        {diario.imagemFundo && (
          <div
            className={styles.backgroundImage}
            style={{
              backgroundImage: `url(${diario.imagemFundo})`,
            }}
          />
        )}

        <div className={styles.content}>
          <h1 className={styles.titulo}>{diario.titulo}</h1>
          <p className={styles.data}>📅 {diario.data}</p>
          <div className={styles.texto}>{diario.texto}</div>

          <div className={styles.footer}>
            <p className={styles.autor}>Escrito por {diario.user.nome}</p>
            <Link href="/profile" className={styles.voltar}>
              ← Voltar ao perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
