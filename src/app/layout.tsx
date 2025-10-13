import './styles/globals.css';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'Journaline',
  description: 'Diário gamificado',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
