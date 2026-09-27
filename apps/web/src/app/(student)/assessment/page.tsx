'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, BrainCircuit } from 'lucide-react';
import { LevelBadge } from '@/components/student/LevelBadge';
import { AudioButton } from '@/components/shared/AudioButton';
import { GuestRegisterModal } from '@/components/student/GuestRegisterModal';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  questionText: string;
  audioPrompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: 'q1',
    questionText: 'Tính nhẩm nhanh: 25 + 38 = ?',
    audioPrompt: 'Hãy tính nhẩm: hai mươi lăm cộng ba mươi tám bằng bao nhiêu?',
    options: [
      { id: 'opt_a', text: '53' },
      { id: 'opt_b', text: '63' },
      { id: 'opt_c', text: '62' },
      { id: 'opt_d', text: '73' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'Ta cộng hàng đơn vị trước: 5 + 8 = 13 (viết 3 nhớ 1). 2 + 3 + 1 = 6. Kết quả là 63.',
  },
  {
    id: 'q2',
    questionText: 'Bạn Lan có 15 viên kẹo, cho Mai 4 viên và cho Hùng 3 viên. Hỏi Lan còn lại bao nhiêu viên?',
    audioPrompt: 'Bạn Lan có 15 viên kẹo, cho Mai 4 viên và cho Hùng 3 viên. Hỏi Lan còn lại bao nhiêu viên?',
    options: [
      { id: 'opt_a', text: '7 viên' },
      { id: 'opt_b', text: '8 viên' },
      { id: 'opt_c', text: '9 viên' },
      { id: 'opt_d', text: '10 viên' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'Tổng số kẹo Lan đã cho là 4 + 3 = 7 viên. Số kẹo Lan còn lại là 15 - 7 = 8 viên.',
  },
  {
    id: 'q3',
    questionText: 'Trong giờ ra chơi ở sân trường, nếu em thấy bạn làm rơi đồ thì em nên làm gì?',
    audioPrompt: 'Trong giờ ra chơi ở sân trường, nếu em thấy bạn làm rơi đồ thì em nên làm gì?',
    options: [
      { id: 'opt_a', text: 'Cất vào cặp mang về nhà' },
      { id: 'opt_b', text: 'Nhặt lên và gửi thầy cô giáo hoặc ban giám hiệu' },
      { id: 'opt_c', text: 'Bỏ đi xem như không thấy' },
    ],
    correctOptionId: 'opt_b',
    explanation: 'Kỹ năng sống: Khi nhặt được của rơi, em cần nhờ thầy cô giúp đỡ để gửi lại người đánh mất.',
  },
  {
    id: 'q4',
    questionText: 'Tìm số tiếp theo trong quy luật dãy số: 2, 4, 8, 16, ...',
    audioPrompt: 'Tìm số tiếp theo trong dãy số: 2, 4, 8, 16',
    options: [
      { id: 'opt_a', text: '24' },
      { id: 'opt_b', text: '30' },
      { id: 'opt_c', text: '32' },
      { id: 'opt_d', text: '64' },
    ],
    correctOptionId: 'opt_c',
    explanation: 'Quy luật: Mỗi số sau gấp đôi số liền trước nó (nhân với 2). 16 nhân 2 bằng 32.',
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const currentQ = mockQuestions[currentIdx];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowRegisterModal(true);
    // Bắn pháo hoa ăn mừng khi hoàn thành bài test
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Tính điểm & Xếp loại
  let correctCount = 0;
  mockQuestions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctOptionId) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / mockQuestions.length) * 100);
  const level: 'BASIC' | 'APPLIED' | 'ADVANCED' =
    score < 50 ? 'BASIC' : score <= 80 ? 'APPLIED' : 'ADVANCED';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Tiêu đề trang */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            Đánh Giá Đầu Vào
          </span>
          <h1 className="text-2xl md:text-3xl font-black">Bài Khảo Sát Năng Lực Của Bé</h1>
          <p className="text-sky-100 text-sm mt-1">
            Làm bài thật cẩn thận để hệ thống AI xếp trình độ và gợi ý kế hoạch học nhé!
          </p>
        </div>
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
          🎯
        </div>
      </div>

      {!isSubmitted ? (
        /* MÀN HÌNH ĐANG LÀM BÀI */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          {/* Thanh tiến độ */}
          <div className="flex items-center justify-between text-sm font-bold text-slate-500">
            <span>
              Câu hỏi {currentIdx + 1} / {mockQuestions.length}
            </span>
            <AudioButton textToRead={currentQ.audioPrompt} />
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / mockQuestions.length) * 100}%` }}
            />
          </div>

          {/* Câu hỏi */}
          <div className="py-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
              {currentQ.questionText}
            </h2>
          </div>

          {/* Danh sách đáp án */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-5 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between text-base ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-md scale-[1.02]'
                      : 'border-slate-200 hover:border-sky-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <span>{opt.text}</span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && '✓'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Điều hướng chuyển câu */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-100"
            >
              Quay lại
            </button>

            {currentIdx < mockQuestions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQ.id]}
                className="px-8 py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswers[currentQ.id]}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>Nộp bài & Xem kết quả</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* MÀN HÌNH KẾT QUẢ & XEM LẠI ĐÁP ÁN ĐÃ LƯU */
        <div className="space-y-6">
          {/* Card Tổng kết điểm & Cấp độ */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
            <div className="text-5xl">🏆</div>
            <h2 className="text-2xl font-extrabold text-slate-800">Chúc Mừng Em Đã Hoàn Thành!</h2>
            <p className="text-slate-600 text-sm">
              Em đã trả lời đúng <strong>{correctCount}</strong> trên tổng số{' '}
              <strong>{mockQuestions.length}</strong> câu hỏi.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <LevelBadge level={level} score={score} />
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center gap-2 animate-bounce"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Lưu Bài Làm & Nhận Kế Hoạch AI</span>
              </button>
              <button
                onClick={() => router.push('/plan')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <BrainCircuit className="w-5 h-5" />
                <span>Xem Kế Hoạch AI</span>
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                }}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài test</span>
              </button>
            </div>
          </div>

          {/* KHU VỰC XEM LẠI ĐÁP ÁN (Lưu vào hệ thống và xem lại được) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-800">
                📖 Xem Lại Đáp Án Chi Tiết Đã Lưu
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Hệ thống đã lưu vào lịch sử học tập
              </span>
            </div>

            <div className="space-y-6">
              {mockQuestions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctOptionId;
                const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
                const userOpt = q.options.find((o) => o.id === userAns);

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border-2 space-y-3 ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-bold text-slate-800 text-base">
                        Câu {idx + 1}: {q.questionText}
                      </h4>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-sm shrink-0">
                          <CheckCircle2 className="w-5 h-5" /> Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-sm shrink-0">
                          <XCircle className="w-5 h-5" /> Chưa đúng
                        </span>
                      )}
                    </div>

                    <div className="text-sm space-y-1 text-slate-700">
                      <p>
                        <strong>Lựa chọn của em:</strong>{' '}
                        <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                          {userOpt?.text || 'Chưa chọn'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <strong>Đáp án chính xác:</strong>{' '}
                          <span className="text-emerald-700 font-bold">{correctOpt?.text}</span>
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                      💡 <strong>Lời giải thích:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL GUEST-FIRST REGISTER POPUP */}
      {showRegisterModal && (
        <GuestRegisterModal
          score={score}
          level={level}
          submissionData={{
            totalQuestions: mockQuestions.length,
            correctCount,
            score,
            proficiencyLevel: level,
            answers: Object.entries(selectedAnswers).map(([qId, optId]) => ({
              questionId: qId,
              selectedOptionId: optId,
              isCorrect: optId === mockQuestions.find((q) => q.id === qId)?.correctOptionId,
            })),
            questionsReview: mockQuestions,
          }}
          onClose={() => setShowRegisterModal(false)}
        />
      )}
    </div>
  );
}
