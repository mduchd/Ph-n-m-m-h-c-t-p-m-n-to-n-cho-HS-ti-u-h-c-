'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, KeyRound, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { createGuestStudent, submitAssessment } from '@/lib/api';

const MASCOTS = [
  { id: 'bear', icon: '🐻', label: 'Gấu Chăm Chỉ' },
  { id: 'rabbit', icon: '🐰', label: 'Thỏ Nhanh Nhẹn' },
  { id: 'lion', icon: '🦁', label: 'Sư Tử Dũng Cảm' },
  { id: 'fox', icon: '🦊', label: 'Cáo Thông Thái' },
  { id: 'panda', icon: '🐼', label: 'Gấu Trúc Vui Vẻ' },
];

interface GuestRegisterModalProps {
  score: number;
  level: 'BASIC' | 'APPLIED' | 'ADVANCED';
  submissionData: any;
  onClose: () => void;
}

export const GuestRegisterModal: React.FC<GuestRegisterModalProps> = ({
  score,
  level,
  submissionData,
  onClose,
}) => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const setSubmission = useAppStore((state) => state.setSubmission);
  const setPlan = useAppStore((state) => state.setPlan);

  const [fullName, setFullName] = useState('');
  const [selectedMascot, setSelectedMascot] = useState('rabbit');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const levelName = {
    BASIC: 'Cơ bản',
    APPLIED: 'Vận dụng',
    ADVANCED: 'Vận dụng cao',
  }[level];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Bé hãy nhập tên của mình nhé!');
      return;
    }
    if (pin.length < 4) {
      setError('Mã PIN cần có 4 chữ số bí mật (ví dụ: 1234)');
      return;
    }

    setIsSaving(true);
    try {
      const mascotObj = MASCOTS.find((m) => m.id === selectedMascot);
      const user = await createGuestStudent({
        fullName: fullName.trim(),
        avatarMascot: mascotObj?.icon || '🐰',
        gradeLevel: 3,
      });
      const answers = Object.fromEntries(
        submissionData.answers.map((answer: { questionId: string; selectedOptionId: string }) => [
          answer.questionId,
          answer.selectedOptionId,
        ]),
      );
      const { gradeResult, learningPlan } = await submitAssessment(user.id, answers);

      setUser(user);
      setSubmission({
        id: gradeResult.id,
        studentId: user.id,
        totalQuestions: gradeResult.totalQuestions,
        correctAnswersCount: gradeResult.correctCount,
        score: gradeResult.score,
        proficiencyLevel: gradeResult.proficiencyLevel,
        answers: submissionData.answers,
        questionsReview: submissionData.questionsReview,
        completedAt: gradeResult.completedAt,
      });
      setPlan(learningPlan);
      router.push('/plan');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Không thể lưu bài làm.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 border-4 border-amber-300 relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
        >
          ✕
        </button>

        {/* Header chào đón */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Lưu Kết Quả & Nhận Lộ Trình AI
          </div>
          <h2 className="text-2xl font-black text-slate-800">
            Tuyệt Vời! Em Đạt Trình Độ {levelName} 🎉
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            Hãy đặt tên và mã PIN 4 số đơn giản để hệ thống lưu lại bài làm của em và mở khóa Kế hoạch học tập nhé!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nhập tên */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-sky-500" /> Tên của em là gì?
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Nguyễn Văn An"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-semibold focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Chọn linh vật Mascot */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Chọn một bạn linh vật đồng hành cùng em:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MASCOTS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMascot(m.id)}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                    selectedMascot === m.id
                      ? 'border-amber-400 bg-amber-50 shadow-md scale-105'
                      : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <span className="text-3xl">{m.icon}</span>
                  <span className="text-[10px] font-bold text-slate-600 mt-1 line-clamp-1">
                    {m.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Nhập mã PIN 4 số */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-purple-500" /> Mã PIN bí mật 4 số (để lần sau đăng nhập):
            </label>
            <input
              type="password"
              maxLength={4}
              required
              placeholder="Ví dụ: 1234 hoặc ngày sinh"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/[^0-9]/g, ''));
                setError('');
              }}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-center font-mono font-black text-xl tracking-widest focus:border-purple-500 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-600 text-center">{error}</p>
          )}

          {/* Nút hoàn tất */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
                <span>{isSaving ? 'Đang lưu bài làm...' : 'Lưu Bài Làm & Mở Kế Hoạch AI'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
