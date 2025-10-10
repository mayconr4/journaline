"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoSrc from "../../public/logo-diario.png";
import {
  BookOpen,
  BarChart3,
  Settings,
  Search,
  Target,
  Trophy,
  Moon,
  Sun,
  Flame,
} from "lucide-react";
import { usarGamificacao } from "@/lib/contexts/GamificationContext";
import styles from "./Menu.module.css";

export default function Menu() {
  const pathname = usePathname();
  const { setTheme, isDark } = usarTema();
  const { points, streak } = usarGamificacao();

  const itensNavegacao = [
    { href: "/", label: "Diário", icon: BookOpen },
    { href: "/estatisticas", label: "Estatísticas", icon: BarChart3 },
    { href: "/metas", label: "Metas", icon: Target },
    { href: "/configuracoes", label: "Configurações", icon: Settings },
    { href: "/busca", label: "Busca", icon: Search },
    { href: "/conquistas", label: "Conquistas", icon: Trophy },
  ];

  const alternarTema = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav className={styles.menu}>
      <div className={styles.logoArea}>
        <Link href="/" aria-label="Página inicial">
          <Image
            src={logoSrc}
            alt="Logo Journaline"
            width={40}
            height={40}
            priority
          />
        </Link>
        <span className={styles.titulo}>Journaline</span>
      </div>

      <div className={styles.links}>
        {itensNavegacao.map((item) => {
          const Icone = item.icon;
          const ativo = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${ativo ? styles.ativo : ""}`}
            >
              <Icone className={styles.icone} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className={styles.direita}>
        <div className={styles.gamificacao}>
          <div className={styles.gamItem}>
            <Trophy className={styles.trophy} /> {points}
          </div>
          <div className={styles.divisor}></div>
          <div className={styles.gamItem}>
            <Flame className={styles.flame} /> {streak}d
          </div>
        </div>

        <button
          onClick={alternarTema}
          className={styles.botaoTema}
          title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
          {isDark ? (
            <Sun className={styles.iconeTema} />
          ) : (
            <Moon className={styles.iconeTema} />
          )}
        </button>
      </div>
    </nav>
  );
}
