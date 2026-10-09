'use client';

import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Star, Trophy, Users, ShieldCheck } from 'lucide-react';
import { MascotOwl } from '@/components/kid/MascotOwl';
import { TactileButton } from '@/components/kid/TactileButton';
import { cardMotion, listItemVariants, staggerContainerVariants } from '@/lib/motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-kid-cream flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background playful clouds and decor */}
      <div className="absolute top-10 left-10 w-32 h-16 bg-white/70 rounded-full blur-[1px] -z-0 pointer-events-none" />
      <div className="absolute top-20 right-16 w-48 h-20 bg-white/60 rounded-full blur-[1px] -z-0 pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-40 h-16 bg-amber-100/50 rounded-full blur-[2px] -z-0 pointer-events-none" />

      <m.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center space-y-8 relative z-10"
      >
        {/* Mascot & Welcoming Header */}
        <m.div variants={listItemVariants} className="flex flex-col items-center space-y-4">
          <MascotOwl
            size="lg"
            mood="waving"
            speechBubble="Chào mừng bạn đến với Trường Học Thông Thái! 🎒"
          />

          <div className="space-y-2 max-w-xl mx-auto">
            <h1 className="font-display text-3xl md:text-5xl font-black text-kid-dark tracking-tight">
              Hôm nay chúng mình cùng <span className="text-amber-500 underline decoration-wavy decoration-amber-300">học vui</span> nhé!
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed">
              Khám phá thế giới Toán học thông minh, rèn luyện Kỹ năng sống và cùng vươn tới danh hiệu Trạng Nguyên Nhí!
            </p>
          </div>
        </m.div>

        {/* 2 Lựa chọn vai trò dạng 3D Portal Cards */}
        <m.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* CỔNG HỌC SINH */}
          <m.div
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            whileTap={cardMotion.whileTap}
            transition={cardMotion.transition}
            className="bg-white border-2 border-amber-200 rounded-4xl p-7 text-left shadow-sm hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full -translate-y-12 translate-x-12 -z-0 group-hover:scale-125 transition-transform" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Dành Cho Các Bé
                </span>
                <span className="text-3xl">🚀</span>
              </div>

              <div>
                <h2 className="font-display text-2xl font-black text-slate-800">
                  Em Là Học Sinh
                </h2>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed font-semibold">
                  Làm bài khảo sát vui, nhận kế hoạch học tập cá nhân hóa và chinh phục các thử thách rực rỡ!
                </p>
              </div>

              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                  <span>Bài kiểm tra nhẹ nhàng, có giọng đọc câu hỏi</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">✓</div>
                  <span>Lộ trình nhiệm vụ AI kèm huy hiệu sao</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">✓</div>
                  <span>Kho mini-game Toán & tình huống Kỹ năng sống</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <TactileButton
                variant="yellow"
                size="lg"
                className="w-full font-black font-display text-amber-950"
                onClick={() => router.push('/assessment')}
              >
                <span>Bắt Đầu Khám Phá Ngay</span>
                <ArrowRight className="w-5 h-5" />
              </TactileButton>
            </div>
          </m.div>

          {/* CỔNG GIÁO VIÊN */}
          <m.div
            variants={listItemVariants}
            whileHover={cardMotion.whileHover}
            whileTap={cardMotion.whileTap}
            transition={cardMotion.transition}
            className="bg-white border-2 border-emerald-200 rounded-4xl p-7 text-left shadow-sm hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full -translate-y-12 translate-x-12 -z-0 group-hover:scale-125 transition-transform" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Không Gian Sư Phạm
                </span>
                <span className="text-3xl">👩‍🏫</span>
              </div>

              <div>
                <h2 className="font-display text-2xl font-black text-slate-800">
                  Tôi Là Giáo Viên
                </h2>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed font-semibold">
                  Mở lớp học, cấp mã xác nhận cho học sinh, kiểm soát danh sách đề bài và theo dõi tiến độ cả lớp.
                </p>
              </div>

              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">✓</div>
                  <span>Cấp mã PIN lớp học & Duyệt học sinh 1-click</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">✓</div>
                  <span>Ngân hàng bài tập Công khai & Riêng tư</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">✓</div>
                  <span>Báo cáo phổ điểm & phân loại 3 mức năng lực</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <TactileButton
                variant="green"
                size="lg"
                className="w-full font-black font-display"
                onClick={() => router.push('/classes')}
              >
                <span>Vào Không Gian Quản Lý Lớp</span>
                <ArrowRight className="w-5 h-5" />
              </TactileButton>
            </div>
          </m.div>
        </m.div>

        {/* Footer ghi chú nhỏ */}
        <m.p variants={listItemVariants} className="text-xs text-slate-400 font-bold pt-4">
          Nền tảng học tập thông minh & kỹ năng sống tích hợp AI dành cho học sinh tiểu học
        </m.p>
      </m.div>
    </main>
  );
}
