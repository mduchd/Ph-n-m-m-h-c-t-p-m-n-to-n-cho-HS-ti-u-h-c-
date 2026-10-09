'use client';

import React from 'react';
import { Gamepad2, Trophy, Flame, Play, Sparkles } from 'lucide-react';

const games = [
  {
    id: 'game-1',
    title: 'Ong Vàng Chăm Chỉ',
    badge: 'Toán Cộng Trừ',
    description: 'Giúp chú ong vàng bay qua các bông hoa bằng cách chọn đúng kết quả phép tính trước khi hết giờ!',
    players: '1.2k bé đang chơi',
    difficulty: 'Dễ',
    color: 'from-amber-400 to-yellow-500',
    icon: '🐝',
  },
  {
    id: 'game-2',
    title: 'Đua Xe Toán Học Thần Tốc',
    badge: 'Toán Nhân Chia',
    description: 'Tăng tốc xe đua bằng các phép tính nhẩm chuẩn xác để vượt qua đối thủ và về đích đầu tiên.',
    players: '850 bé đang chơi',
    difficulty: 'Trung bình',
    color: 'from-rose-400 to-red-500',
    icon: '🏎️',
  },
  {
    id: 'game-3',
    title: 'Bảo Vệ Nông Trại Vui Vẻ',
    badge: 'Quy Luật Số Học',
    description: 'Xếp các con số theo đúng quy luật dãy số để xây hàng rào kiên cố bảo vệ vườn cây của bác gấu.',
    players: '620 bé đang chơi',
    difficulty: 'Thử thách',
    color: 'from-emerald-400 to-teal-500',
    icon: '🌻',
  },
  {
    id: 'game-4',
    title: 'Mê Cung Logic Tí Hon',
    badge: 'Tư Duy Hình Học',
    description: 'Đếm số hình vuông, hình tam giác để mở khóa các cánh cửa bí mật trong lâu đài trí tuệ.',
    players: '940 bé đang chơi',
    difficulty: 'Trung bình',
    color: 'from-purple-400 to-indigo-500',
    icon: '🏰',
  },
];

export default function GamesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            Vừa Chơi Vừa Học
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2">
            Đấu Trường Trò Chơi Trí Tuệ
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Chinh phục các thử thách toán học vui nhộn để giành cúp và tích lũy ngôi sao đổi quà nhé!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className={`p-6 bg-gradient-to-r ${g.color} text-white flex items-center justify-between`}>
              <div className="space-y-1">
                <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
                  {g.badge}
                </span>
                <h3 className="text-xl font-black">{g.title}</h3>
              </div>
              <div className="text-5xl">{g.icon}</div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                {g.description}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" /> {g.players}
                </span>
                <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Vào chơi ngay</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
