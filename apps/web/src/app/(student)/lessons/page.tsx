'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Play, Clock, Star } from 'lucide-react';

const lessonsData = [
  {
    id: 1,
    title: 'Phép cộng có nhớ trong phạm vi 100',
    grade: 'Lớp 3',
    subject: 'Toán học',
    duration: '15 phút',
    points: 20,
    completed: true,
    description: 'Học cách thực hiện phép tính cộng có nhớ hàng chục và hàng đơn vị một cách chính xác.',
    icon: '➕',
  },
  {
    id: 2,
    title: 'Tính nhanh các số tròn chục và tròn trăm',
    grade: 'Lớp 3',
    subject: 'Toán học',
    duration: '20 phút',
    points: 25,
    completed: false,
    description: 'Bí quyết tính nhẩm thần tốc giúp bé giải toán nhanh như chớp!',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Bài toán tìm hai số khi biết Tổng và Hiệu',
    grade: 'Lớp 3 - 4',
    subject: 'Toán tư duy',
    duration: '25 phút',
    points: 30,
    completed: false,
    description: 'Phương pháp vẽ sơ đồ đoạn thẳng giải quyết dạng toán kinh điển bậc tiểu học.',
    icon: '📐',
  },
  {
    id: 4,
    title: 'Hình học trực quan: Chu vi & Diện tích hình chữ nhật',
    grade: 'Lớp 3',
    subject: 'Hình học',
    duration: '18 phút',
    points: 20,
    completed: false,
    description: 'Quan sát các ví dụ thực tế xung quanh cuộc sống để ghi nhớ công thức dễ dàng.',
    icon: '🟧',
  },
];

export default function LessonsPage() {
  const [selectedSubject, setSelectedSubject] = useState('Tất cả');

  const filtered = selectedSubject === 'Tất cả' 
    ? lessonsData 
    : lessonsData.filter(l => l.subject === selectedSubject);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Kho Bài Giảng Tương Tác
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2">
            Bài Học Toán Vui Nhộn
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Mỗi bài học được thiết kế ngắn gọn, trực quan kèm các ví dụ sinh động dành riêng cho học sinh tiểu học.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['Tất cả', 'Toán học', 'Toán tư duy', 'Hình học'].map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedSubject === sub
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{lesson.icon}</span>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">
                    {lesson.subject}
                  </span>
                </div>
                {lesson.completed ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã học xong
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5" /> +{lesson.points} sao
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-800 text-lg leading-snug">
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lesson.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {lesson.duration}
              </span>
              <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" />
                <span>{lesson.completed ? 'Ôn lại' : 'Bắt đầu học'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
