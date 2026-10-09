'use client';

import React from 'react';
import { m } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Award, CheckCircle2 } from 'lucide-react';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

export default function AnalyticsPage() {
  const stats = [
    { label: 'Tổng số học sinh', value: '24', change: '+3 tuần này', icon: Users, color: 'text-sky-600 bg-sky-50' },
    { label: 'Điểm khảo sát TB', value: '78/100', change: '+8% so với đầu kỳ', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Tỉ lệ hoàn thành test', value: '92%', change: '22/24 học sinh', icon: CheckCircle2, color: 'text-purple-600 bg-purple-50' },
    { label: 'Học sinh Vận dụng cao', value: '8 em', change: 'Đạt trên 80 điểm', icon: Award, color: 'text-amber-600 bg-amber-50' },
  ];

  const levels = [
    { name: 'Cơ bản (Dưới 50đ)', count: 4, percent: '17%', color: 'bg-rose-400' },
    { name: 'Vận dụng (50 - 80đ)', count: 12, percent: '50%', color: 'bg-sky-400' },
    { name: 'Vận dụng cao (Trên 80đ)', count: 8, percent: '33%', color: 'bg-emerald-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
          Thống Kê Tiến Độ Học Tập
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Theo dõi kết quả khảo sát đầu vào, mức độ phân loại năng lực và tình hình làm bài của cả lớp.
        </p>
      </div>

      <m.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <m.div
              key={idx}
              variants={listItemVariants}
              whileHover={cardMotion.whileHover}
              transition={gentleSpring}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{s.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-800">{s.value}</div>
              <div className="text-[11px] text-slate-400 font-semibold">{s.change}</div>
            </m.div>
          );
        })}
      </m.div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-800">
          Phân Bổ Cấp Độ Học Sinh (Dựa Trên Khảo Sát Đầu Vào)
        </h2>

        <div className="space-y-4">
          {levels.map((lvl) => (
            <div key={lvl.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">{lvl.name}</span>
                <span className="text-slate-500">{lvl.count} học sinh ({lvl.percent})</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <m.div
                  className={`h-full rounded-full ${lvl.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: lvl.percent }}
                  transition={{ ...gentleSpring, delay: 0.16 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
