'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap, Sparkles, School, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Tiêu đề & Mascot chào mừng */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-300 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-sm text-sm md:text-base animate-bounce">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Chào mừng bạn đến với Trường Học Thông Thái!
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Bạn là <span className="text-sky-600">Học Sinh</span> hay{' '}
            <span className="text-emerald-600">Giáo Viên</span>?
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
            Hãy chọn vai trò của bạn để bắt đầu khám phá các bài học thú vị, trò chơi và lớp học nhé!
          </p>
        </div>

        {/* 2 Lựa chọn vai trò lớn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Nút Học Sinh */}
          <button
            onClick={() => router.push('/assessment')}
            className="group relative bg-white border-4 border-sky-300 hover:border-sky-500 rounded-3xl p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                🎒
              </div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                Em Là Học Sinh
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Làm bài kiểm tra đánh giá năng lực đầu vào để nhận kế hoạch học tập siêu vui và xếp hạng trình độ nhé!
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-sky-600 font-bold text-base">
              <span>Bắt đầu làm bài test</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* Nút Giáo Viên */}
          <button
            onClick={() => router.push('/classes')}
            className="group relative bg-white border-4 border-emerald-300 hover:border-emerald-500 rounded-3xl p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                👩‍🏫
              </div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                Tôi Là Giáo Viên
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mở lớp học mới, tạo mã xác nhận mời học sinh tham gia, quản lý đề bài và theo dõi tiến độ học tập.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-2 text-emerald-600 font-bold text-base">
              <span>Vào bảng quản lý lớp</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
