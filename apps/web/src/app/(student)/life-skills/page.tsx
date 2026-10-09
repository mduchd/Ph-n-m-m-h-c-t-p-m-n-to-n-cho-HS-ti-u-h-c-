'use client';

import React from 'react';
import { HeartHandshake, ShieldCheck, Smile, HelpCircle, CheckCircle2 } from 'lucide-react';

const skills = [
  {
    id: 1,
    title: 'Kỹ năng tự bảo vệ khi bị lạc ở nơi công cộng',
    category: 'An toàn cá nhân',
    scenario: 'Khi đi siêu thị hoặc công viên đông người mà không thấy bố mẹ, em cần làm gì?',
    steps: [
      'Đứng yên một vị trí an toàn, không chạy lung tung.',
      'Tìm chú bảo vệ, cô thu ngân hoặc người mặc đồng phục để nhờ gọi điện cho bố mẹ.',
      'Ghi nhớ số điện thoại của bố hoặc mẹ.',
      'Tuyệt đối không đi theo người lạ dù họ cho kẹo hay đồ chơi.',
    ],
    icon: '🛡️',
  },
  {
    id: 2,
    title: 'Ứng xử thông minh: Nhặt được của rơi trả người đánh mất',
    category: 'Đạo đức & Văn minh',
    scenario: 'Trong giờ ra chơi ở sân trường, em thấy bạn làm rơi ví hoặc đồ chơi.',
    steps: [
      'Nhặt đồ vật cẩn thận và quan sát xung quanh xem có ai đang tìm kiếm không.',
      'Đem nộp ngay cho thầy cô giáo chủ nhiệm hoặc văn phòng ban giám hiệu.',
      'Không tự ý cất vào cặp hoặc mang về nhà.',
    ],
    icon: '🤝',
  },
  {
    id: 3,
    title: 'Em làm quen với chi tiêu thông minh',
    category: 'Quản lý tài chính nhí',
    scenario: 'Bé được bố mẹ thưởng tiền tiêu vặt hoặc tiền lì xì, làm sao để sử dụng hợp lý?',
    steps: [
      'Phân biệt giữa thứ em CẦN (sách vở, đồ dùng học tập) và thứ em MUỐN (đồ chơi xa xỉ).',
      'Bỏ ống heo tiết kiệm một phần tiền mỗi tuần.',
      'Lập kế hoạch mua sắm nhỏ cùng bố mẹ.',
    ],
    icon: '💰',
  },
];

export default function LifeSkillsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Giáo Dục Toàn Diện
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2">
            Kỹ Năng Sống Cho Học Sinh Tiểu Học
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Những bài học tình huống thực tế giúp bé tự tin, an toàn và ứng xử lễ phép mỗi ngày.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {skill.icon}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-md inline-block">
                  {skill.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800">{skill.title}</h3>
                <p className="text-xs text-slate-500 italic">
                  💡 Tình huống: "{skill.scenario}"
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
              <h4 className="text-xs font-extrabold text-slate-700">Các bước xử lý đúng:</h4>
              <ul className="space-y-1.5">
                {skill.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
