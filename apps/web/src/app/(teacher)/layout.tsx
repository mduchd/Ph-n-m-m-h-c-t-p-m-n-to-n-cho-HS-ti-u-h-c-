'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';
import {
  Home,
  BookOpen,
  Users,
  GraduationCap,
  Gamepad2,
  HeartHandshake,
  UserSquare2,
  Search,
  BarChart3,
  Bell,
  UserCircle,
  ExternalLink,
} from 'lucide-react';
import { PageTransition } from '@/components/motion/PageTransition';
import { gentleSpring } from '@/lib/motion';

const teacherSidebarItems = [
  { href: '/classes', label: 'Lớp học & Duyệt HS', icon: Users },
  { href: '/library', label: 'Ngân hàng bài tập', icon: BookOpen },
  { href: '/lessons', label: 'Kho bài học', icon: GraduationCap },
  { href: '/games', label: 'Trò chơi trí tuệ', icon: Gamepad2 },
  { href: '/life-skills', label: 'Kỹ năng sống', icon: HeartHandshake },
  { href: '/students', label: 'Danh sách học sinh', icon: UserSquare2 },
  { href: '/analytics', label: 'Thống kê & Báo cáo', icon: BarChart3 },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. HÀNG NGANG TRÊN CÙNG (Topbar Cổng Giáo Viên) */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Logo & Về trang chủ */}
        <div className="flex items-center gap-6">
          <Link href="/classes" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
              👩‍🏫
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base">Cổng Giáo Viên</span>
              <p className="text-[11px] text-slate-400 font-semibold">Hệ Thống Quản Lý Dạy Học</p>
            </div>
          </Link>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors border border-slate-200"
          >
            <Home className="w-3.5 h-3.5" /> Trang chủ
          </Link>
        </div>

        {/* Thanh tìm kiếm nhanh */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh, bài tập, lớp học..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Thống kê, Thông báo, Profile giáo viên */}
        <div className="flex items-center gap-3">
          <Link
            href="/analytics"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Thống kê điểm</span>
          </Link>

          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <UserCircle className="w-8 h-8 text-emerald-700" />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">Cô Hoàng Mai</p>
              <p className="text-[10px] text-slate-400 font-semibold">Khối 3 Tiểu Học</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT + SIDEBAR GIÁO VIÊN */}
      <div className="flex-1 flex min-h-0">
        {/* SIDEBAR SƯ PHẠM */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-4 space-y-4">
          <nav className="space-y-1.5">
            {teacherSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'text-emerald-800 font-extrabold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {isActive ? (
                    <m.span
                      layoutId="teacher-active-nav"
                      className="absolute inset-0 rounded-xl border border-emerald-200 bg-emerald-50"
                      transition={gentleSpring}
                    />
                  ) : null}
                  <Icon className={`relative z-10 w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <p className="font-extrabold">💡 Mẹo Sư Phạm:</p>
            <p className="text-[11px] leading-relaxed text-emerald-800">
              Chiếu mã PIN lên bảng thông minh để học sinh dùng máy tính bảng nhập và gửi yêu cầu vào lớp tự động.
            </p>
          </div>
        </aside>

        {/* NỘI DUNG TRANG GIÁO VIÊN */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <PageTransition key={pathname}>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
