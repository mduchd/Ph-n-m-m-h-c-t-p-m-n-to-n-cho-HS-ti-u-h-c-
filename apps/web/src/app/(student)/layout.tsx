'use client';

import React from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Users,
  UserCheck,
  BrainCircuit,
  GraduationCap,
  Gamepad2,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const studentNavItems = [
  { href: '/dashboard', label: 'Trang chủ', icon: Home, color: 'text-sky-500' },
  { href: '/library', label: 'Thư viện của bạn', icon: BookOpen, color: 'text-amber-500' },
  { href: '/classroom', label: 'Lớp học', icon: Users, color: 'text-emerald-500' },
  { href: '/classroom/group', label: 'Nhóm học', icon: UserCheck, color: 'text-indigo-500' },
  { href: '/plan', label: 'Kế hoạch học tập (AI)', icon: BrainCircuit, color: 'text-purple-500' },
  { href: '/lessons', label: 'Bài học', icon: GraduationCap, color: 'text-blue-500' },
  { href: '/games', label: 'Trò chơi', icon: Gamepad2, color: 'text-pink-500' },
  { href: '/life-skills', label: 'Kỹ năng sống', icon: HeartHandshake, color: 'text-orange-500' },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* CỘT DỌC (Sidebar của Học Sinh) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm hidden md:flex">
        <div className="p-4 space-y-6">
          {/* Logo trường học */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-sky-400 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
              🎒
            </div>
            <div>
              <h1 className="font-extrabold text-slate-800 text-lg leading-tight">Bé Thông Thái</h1>
              <span className="text-xs text-slate-400 font-semibold">Góc Học Sinh</span>
            </div>
          </div>

          {/* Menu cột dọc */}
          <nav className="space-y-1">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mascot & Huy hiệu bé đạt được */}
        <div className="p-4 m-3 bg-gradient-to-tr from-amber-100 to-yellow-50 rounded-2xl border border-amber-200 text-center space-y-2">
          <div className="text-3xl">⭐</div>
          <p className="text-xs font-bold text-amber-800">Bé chăm ngoan: 120 Điểm Sao</p>
          <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
            <div className="bg-amber-400 h-full w-3/4 rounded-full" />
          </div>
        </div>
      </aside>

      {/* VÙNG NỘI DUNG CHÍNH */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-500">
            👋 Chào em, chúc em có một ngày học tập vui vẻ!
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> Khối Lớp 3
            </span>
            {currentUser ? (
              <div className="flex items-center gap-2 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                <span className="text-xl">{currentUser.avatarMascot || '🎒'}</span>
                <span className="font-bold text-xs text-sky-800">{currentUser.fullName}</span>
              </div>
            ) : (
              <a
                href="/assessment"
                className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-300 hover:bg-amber-200"
              >
                <span>Làm bài test để lưu tên</span>
              </a>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
