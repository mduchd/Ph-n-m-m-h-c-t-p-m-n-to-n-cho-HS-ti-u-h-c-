import type { Metadata } from 'next';
import { Nunito, Fredoka } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bé Thông Thái - Trường Học Vui Nhộn',
  description: 'Hệ thống học tập, khảo sát đánh giá năng lực và kỹ năng sống sinh động dành cho học sinh tiểu học',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="min-h-screen font-body bg-kid-cream text-kid-dark antialiased">
        {children}
      </body>
    </html>
  );
}
