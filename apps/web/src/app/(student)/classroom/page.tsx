'use client';

import React, { useState } from 'react';
import { Users, KeyRound, CheckCircle2, Clock, AlertCircle, School } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { sound } from '@/lib/sound';

interface StudentClass {
  id: string;
  name: string;
  teacherName: string;
  joinCode: string;
  status: 'PENDING' | 'APPROVED';
}

export default function StudentClassroomPage() {
  const [classes, setClasses] = useState<StudentClass[]>([
    {
      id: 'c1',
      name: 'Lớp 3A - Toán & Kỹ Năng Sống',
      teacherName: 'Cô Hoàng Mai',
      joinCode: 'TOAN3A',
      status: 'APPROVED',
    },
  ]);

  const [inputCode, setInputCode] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const code = inputCode.trim().toUpperCase();

    const newJoin: StudentClass = {
      id: `c-${Date.now()}`,
      name: `Lớp học Toán (Mã: ${code})`,
      teacherName: 'Giáo viên bộ môn',
      joinCode: code,
      status: 'PENDING',
    };

    sound.playSuccess();
    setClasses([...classes, newJoin]);
    setInputCode('');
    setShowJoinModal(false);
    setMessage({
      text: `Đã gửi mã "${code}" thành công! Bé hãy chờ thầy cô phê duyệt nhé! 🎉`,
      type: 'success',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tiêu đề & Nút Nhập mã vào lớp */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
            Lớp Học Trực Tuyến
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 mt-2">
            Lớp Học Của Em
          </h1>
          <p className="text-slate-600 text-sm font-semibold mt-1">
            Nhập mã xác nhận của thầy cô để cùng các bạn vào lớp học tập nhé!
          </p>
        </div>

        <TactileButton
          variant="green"
          size="md"
          onClick={() => {
            sound.playPop();
            setShowJoinModal(true);
          }}
        >
          <KeyRound className="w-5 h-5" />
          <span>Nhập Mã Vào Lớp</span>
        </TactileButton>
      </div>

      {message && (
        <div
          className={`p-4 rounded-3xl border-2 text-sm font-bold flex items-center gap-3 animate-in fade-in duration-200 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Danh sách lớp đã tham gia */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-black text-slate-800">
          Danh Sách Lớp ({classes.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-4xl border-2 border-kid-border p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-black text-slate-800 text-lg">{c.name}</h3>
                  <p className="text-xs font-bold text-slate-500 mt-1">👩‍🏫 Giáo viên: {c.teacherName}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl border-2 border-emerald-200 flex items-center justify-center text-2xl">
                  🏫
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-4 border-t-2 border-kid-border">
                <span className="text-slate-500 font-bold">
                  Mã lớp: <strong className="text-slate-800 font-mono bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">{c.joinCode}</strong>
                </span>

                {c.status === 'APPROVED' ? (
                  <span className="inline-flex items-center gap-1 text-emerald-800 font-black bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã Vào Lớp
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-900 font-black bg-amber-100 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
                    <Clock className="w-3.5 h-3.5" /> Chờ Cô Duyệt
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL NHẬP MÃ XÁC NHẬN */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-4xl max-w-md w-full p-6 md:p-8 shadow-2xl space-y-6 border-2 border-kid-border relative">
            <div className="flex items-center justify-between border-b-2 border-kid-border pb-3">
              <h3 className="font-display text-lg font-black text-slate-800">Tham Gia Lớp Học</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  Mã xác nhận lớp học (thầy cô cấp cho bé):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: TOAN3A"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-center font-mono font-black text-xl tracking-widest uppercase focus:border-emerald-400 focus:outline-none bg-emerald-50/20"
                />
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-semibold text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Sau khi bé gửi mã, thầy cô sẽ nhận được thông báo để duyệt bé vào lớp học chung cùng bạn bè nhé!
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <TactileButton
                  variant="white"
                  size="sm"
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                >
                  Hủy
                </TactileButton>
                <TactileButton
                  variant="green"
                  size="md"
                  type="submit"
                >
                  <span>Gửi Mã Vào Lớp</span>
                </TactileButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
