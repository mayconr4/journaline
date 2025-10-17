<<<<<<< HEAD
'use client';
import Link from 'next/link';
// import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import '../styles/globals.css';
=======
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/globals.css";
>>>>>>> testes

const links = [
  { href: "/", label: "Home" },
  { href: "/diario", label: "Diário" },
  { href: "/conquistas", label: "Conquistas" },
  { href: "/perfil", label: "Perfil" },
  { href: "/configuracoes", label: "Configurações" },
  { href: "/login", label: "Login" },
  { href: "/cadastro", label: "Cadastro" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Novo estado

  useEffect(() => {
    setIsMounted(true); // Define como true após a montagem no cliente
  }, []);

  if (!isMounted) {
    return null; // Não renderiza nada no servidor
  }

  return (
<<<<<<< HEAD
    <motion.nav initial={{ x: -250 }} animate={{ x: 0 }} className="sidebar">
      <Link href="/">
        <img className="logo" src="/logo-diario-certo.png" alt="Journaline Logo" width={150} height={150} />
      </Link>
      {links.map(link => (
        <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
          {link.label}
        </Link>
      ))}
    </motion.nav>
=======
    <>
      {/* Botão de abrir sidebar no mobile */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        {open ? "Fechar" : "Menu"}
      </button>

      <motion.nav
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className={`sidebar ${open ? "active" : ""}`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            onClick={() => setOpen(false)} // fecha sidebar ao clicar
          >
            {link.label}
          </Link>
        ))}
      </motion.nav>
    </>
>>>>>>> testes
  );
}
