'use client';

import React, { useState } from 'react';
import { Users, KeyRound, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

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

    // Giả lập gửi yêu cầu tham gia với mã xác nhận
    const newJoin: StudentClass = {
      id: `c-${Date.now()}`,
      name: `Lớp học (Mã: ${code})`,
      teacherName: 'Giáo viên chủ nhiệm',
      joinCode: code,
      status: 'PENDING', // Bắt buộc chờ GV duyệt
    };

    setClasses([...classes, newJoin]);
    setInputCode('');
    setShowJoinModal(false);
    setMessage({
      text: `Đã gửi yêu cầu tham gia với mã "${code}". Vui lòng chờ Giáo viên phê duyệt nhé!`,
      type: 'success',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tiêu đề & Nút Nhập mã vào lớp */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Lớp Học Trực Tuyến
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2">
            Lớp Học Của Em
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Nhập mã xác nhận của thầy cô để xin tham gia vào lớp học.
          </p>
        </div>

        <button
          onClick={() => setShowJoinModal(true)}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
        >
          <KeyRound className="w-5 h-5" />
          <span>Nhập Mã Xin Vào Lớp</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-sm font-bold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Danh sách lớp đã tham gia hoặc đang chờ duyệt */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Danh Sách Lớp ({classes.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{c.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Giáo viên: {c.teacherName}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">
                  🏫
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                <span className="text-slate-500">
                  Mã lớp: <strong className="text-slate-800 font-mono">{c.joinCode}</strong>
                </span>

                {c.status === 'APPROVED' ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã Vào Lớp
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 animate-pulse">
                    <Clock className="w-3.5 h-3.5" /> Chờ Giáo Viên Duyệt
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL NHẬP MÃ XÁC NHẬN */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Tham Gia Lớp Học</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mã xác nhận lớp học (GV cấp)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: TOAN3A"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-center font-mono font-black text-xl tracking-widest uppercase focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Sau khi em gửi mã xác nhận, thầy cô sẽ nhận được thông báo để kiểm tra và duyệt em vào lớp nhé!
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-md"
                >
                  Gửi Yêu Cầu Vào Lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
