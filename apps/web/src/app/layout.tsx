import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Học Vui Cùng Bạn - Nền Tảng Học Tập Tiểu Học',
  description: 'Hệ thống học tập, kiểm tra đánh giá và kỹ năng sống dành cho học sinh tiểu học',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
