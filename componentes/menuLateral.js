import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/diary', label: 'Diário' },
  { href: '/achievements', label: 'Conquistas' },
  { href: '/profile', label: 'Perfil' },
  { href: '/settings', label: 'Configurações' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-[#E0E0E0] text-[#414833] font-serif shadow-md rounded-r-2xl p-8 flex flex-col h-screen"
    >
      <h2 className="text-2xl font-bold mb-12 select-none">Journaline</h2>
      <ul className="space-y-4 flex-grow">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>
              <a
                className={`block py-3 px-5 rounded-xl transition-colors ${
                  router.pathname === href
                    ? 'bg-[#582F0E] text-white shadow-lg'
                    : 'hover:bg-[#B6AD90] text-[#414833]'
                }`}
              >
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}