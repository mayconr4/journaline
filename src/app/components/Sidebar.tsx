"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/globals.css";

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

  return (
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
  );
}
