'use client';

import React from 'react';
import { BrainCircuit, Sparkles, Target, Calendar, CheckCircle, BookOpen, Gamepad2 } from 'lucide-react';
import { LevelBadge } from '@/components/student/LevelBadge';

export default function AIPlanPage() {
  const planData = {
    level: 'APPLIED' as const,
    score: 75,
    summary:
      'Học sinh có khả năng tính toán nhẩm tốt và hiểu bài nhanh. Để bứt phá lên mức Vận dụng cao, em cần luyện thêm giải toán có lời văn 2 bước tính và tình huống xử lý kỹ năng sống.',
    strengths: ['Tính nhẩm nhanh, chính xác', 'Ghi nhớ kiến thức cơ bản tốt'],
    areasToImprove: ['Phân tích bài toán có lời văn', 'Kỹ năng phản xạ tình huống xã hội'],
    weeks: [
      {
        week: 1,
        title: 'Tuần 1: Chinh phục bài toán giải bằng hai phép tính',
        focus: 'Toán đố & Tư duy logic',
        lessons: ['Bài 3: Tìm hai số khi biết tổng và hiệu', 'Bài 4: Bài toán nhiều hơn, ít hơn'],
        games: ['Đua xe toán học cùng bạn bè'],
        targetMinutes: '15 phút mỗi ngày',
      },
      {
        week: 2,
        title: 'Tuần 2: Rèn luyện Kỹ năng sống & Tự lập',
        focus: 'Kỹ năng giao tiếp & Ứng phó sự cố',
        lessons: ['Kỹ năng 1: Lạc người thân thì làm gì?', 'Kỹ năng 2: Quản lý tiền tiêu vặt'],
        games: ['Thám tử nhí siêu trí tuệ'],
        targetMinutes: '20 phút mỗi ngày',
      },
      {
        week: 3,
        title: 'Tuần 3: Ôn tập nâng cao & Thi đấu nhóm',
        focus: 'Thử thách Vận dụng cao',
        lessons: ['Bài 7: Tìm quy luật dãy số thần tốc'],
        games: ['Đấu trường Trạng Nguyên nhí'],
        targetMinutes: '20 phút mỗi ngày',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Banner AI */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Trợ Lý Học Tập AI Gemini
          </div>
          <h1 className="text-2xl md:text-3xl font-black">
            Kế Hoạch Học Tập Dành Riêng Cho Em
          </h1>
          <p className="text-purple-100 text-sm max-w-xl leading-relaxed">
            Dựa trên kết quả bài test đánh giá đầu vào, Trợ lý AI đã thiết kế riêng một lộ trình học tập 3 tuần để giúp em tiến bộ vượt bậc!
          </p>
        </div>
        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl shadow-inner shrink-0">
          🤖
        </div>
      </div>

      {/* Đánh giá tổng quan & Điểm mạnh/yếu */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Đánh Giá Năng Lực Hiện Tại</h2>
            <p className="text-slate-500 text-xs">Cập nhật tự động sau bài kiểm tra</p>
          </div>
          <LevelBadge level={planData.level} score={planData.score} />
        </div>

        <p className="text-slate-700 text-sm leading-relaxed bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
          💡 <strong>Nhận xét từ AI:</strong> {planData.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Điểm mạnh của em
            </h3>
            <ul className="text-xs text-slate-700 space-y-1.5">
              {planData.strengths.map((s, idx) => (
                <li key={idx}>• {s}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-600" /> Mục tiêu cần rèn luyện
            </h3>
            <ul className="text-xs text-slate-700 space-y-1.5">
              {planData.areasToImprove.map((a, idx) => (
                <li key={idx}>• {a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lộ trình từng tuần do AI lập */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" /> Lộ Trình Ôn Luyện Từng Tuần
        </h2>

        <div className="space-y-4">
          {planData.weeks.map((week) => (
            <div
              key={week.week}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-sm">
                    0{week.week}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{week.title}</h3>
                    <p className="text-xs text-purple-600 font-semibold">Trọng tâm: {week.focus}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  ⏱️ {week.targetMinutes}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Bài học gợi ý */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-600 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-500" /> Bài học khuyên học:
                  </span>
                  <div className="space-y-1.5">
                    {week.lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 hover:bg-sky-50 cursor-pointer transition-colors"
                      >
                        {lesson}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trò chơi bổ trợ */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-600 flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-pink-500" /> Trò chơi luyện tập:
                  </span>
                  <div className="space-y-1.5">
                    {week.games.map((game, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 hover:bg-pink-50 cursor-pointer transition-colors"
                      >
                        🎮 {game}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
