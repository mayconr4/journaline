'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import '../styles/globals.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/diario', label: 'Diário' },
  { href: '/conquistas', label: 'Conquistas' },
  { href: '/perfil', label: 'Perfil' },
  { href: '/configuracoes', label: 'Configurações' },
    { href: '/login', label: 'Login' },
    { href: '/cadastro', label: 'Cadastro' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <motion.nav initial={{ x: -250 }} animate={{ x: 0 }} className="sidebar">
      {links.map(link => (
        <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
          {link.label}
        </Link>
      ))}
    </motion.nav>
  );
}
