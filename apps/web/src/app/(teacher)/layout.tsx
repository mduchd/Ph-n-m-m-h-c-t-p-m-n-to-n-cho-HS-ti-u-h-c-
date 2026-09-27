'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Users,
  UserCheck,
  GraduationCap,
  Gamepad2,
  HeartHandshake,
  UserSquare2,
  Search,
  BarChart3,
  Bell,
  UserCircle,
} from 'lucide-react';

const teacherSidebarItems = [
  { href: '/dashboard?role=teacher', label: 'Trang chủ', icon: Home },
  { href: '/library?role=teacher', label: 'Thư viện của bạn', icon: BookOpen },
  { href: '/classes', label: 'Lớp học', icon: Users },
  { href: '/classes/groups', label: 'Nhóm học', icon: UserCheck },
  { href: '/lessons', label: 'Bài học', icon: GraduationCap },
  { href: '/games', label: 'Trò chơi', icon: Gamepad2 },
  { href: '/life-skills', label: 'Giáo dục Kĩ năng sống', icon: HeartHandshake },
  { href: '/students', label: 'Thông tin học sinh', icon: UserSquare2 },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* 1. HÀNG NGANG TRÊN CÙNG (Top Navigation Bar của Giáo Viên) */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        {/* Logo & Trang chủ */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow">
              👩‍🏫
            </div>
            <div>
              <span className="font-extrabold text-slate-800 text-lg">Cổng Giáo Viên</span>
              <p className="text-[11px] text-slate-400 font-medium">Hệ Thống Quản Lý Dạy Học</p>
            </div>
          </div>
          <a
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600"
          >
            <Home className="w-4 h-4" /> Trang chủ
          </a>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh, bài tập, lớp học..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Thống kê, Thông báo, Tài khoản */}
        <div className="flex items-center gap-4">
          <a
            href="/analytics"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Thống kê</span>
          </a>

          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <UserCircle className="w-8 h-8 text-emerald-700" />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800">Cô Hoàng Mai</p>
              <p className="text-[10px] text-slate-400">Giáo viên chủ nhiệm</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. THÂN TRANG GỒM CỘT DỌC TRÁI & NỘI DUNG */}
      <div className="flex-1 flex min-h-0">
        {/* CỘT DỌC TRÁI (Sidebar của Giáo Viên) */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-4 space-y-4">
          <nav className="space-y-1">
            {teacherSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
            💡 <strong>Mẹo giáo viên:</strong> Bạn có thể chia sẻ đề bài sang chế độ <strong>Công khai</strong> để các đồng nghiệp cùng tham khảo.
          </div>
        </aside>

        {/* Nội dung bảng điều khiển */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
