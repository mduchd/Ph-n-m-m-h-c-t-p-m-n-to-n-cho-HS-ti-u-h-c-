'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  KeyRound,
  Link as LinkIcon,
  Check,
  X,
  Copy,
  Clock,
  CheckCircle2,
  Sparkles,
  QrCode,
} from 'lucide-react';

interface ClassData {
  id: string;
  name: string;
  gradeLevel: number;
  joinCode: string;
  inviteLink: string;
  memberCount: number;
}

interface JoinRequest {
  id: string;
  studentName: string;
  className: string;
  avatar: string;
  time: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 'c1',
      name: 'Lớp 3A - Toán & Kỹ Năng Sống',
      gradeLevel: 3,
      joinCode: 'TOAN3A',
      inviteLink: 'http://localhost:3000/classroom/join?code=TOAN3A',
      memberCount: 24,
    },
  ]);

  const [requests, setRequests] = useState<JoinRequest[]>([
    {
      id: 'req-1',
      studentName: 'Trần Thị Bích',
      className: 'Lớp 3A - Toán & Kỹ Năng Sống',
      avatar: '🐰',
      time: '10 phút trước',
      status: 'PENDING',
    },
    {
      id: 'req-2',
      studentName: 'Lê Hoàng Nam',
      className: 'Lớp 3A - Toán & Kỹ Năng Sống',
      avatar: '🦁',
      time: '25 phút trước',
      status: 'PENDING',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState(3);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newClass: ClassData = {
      id: `c-${Date.now()}`,
      name: newClassName,
      gradeLevel: newGradeLevel,
      joinCode: randomCode,
      inviteLink: `http://localhost:3000/classroom/join?code=${randomCode}`,
      memberCount: 0,
    };

    setClasses([newClass, ...classes]);
    setNewClassName('');
    setShowModal(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r)),
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r)),
    );
  };

  const pendingRequests = requests.filter((r) => r.status === 'PENDING');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tiêu đề & Nút Mở lớp */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Lớp Học & Duyệt Học Sinh
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Tạo lớp, cấp mã PIN xác nhận cho học sinh và phê duyệt yêu cầu vào lớp theo thời gian thực.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Mở Lớp Học Mới</span>
        </button>
      </div>

      {/* DANH SÁCH HỌC SINH ĐANG CHỜ PHÊ DUYỆT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-800">
              Yêu Cầu Tham Gia Chờ Duyệt ({pendingRequests.length})
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Học sinh nhập đúng mã PIN lớp mới được gửi yêu cầu
          </span>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-400 text-sm border border-dashed border-slate-200">
            ✨ Không có học sinh nào đang chờ duyệt. Lớp học đang ổn định!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xs border border-amber-200">
                    {req.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{req.studentName}</h3>
                    <p className="text-xs text-slate-500">{req.className}</p>
                    <span className="text-[10px] text-amber-700 font-bold">{req.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-all flex items-center gap-1 text-xs font-bold"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Duyệt</span>
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-all"
                    title="Từ chối"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DANH SÁCH CÁC LỚP HỌC HIỆN CÓ CỦA GIÁO VIÊN */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800">Danh Sách Lớp Đang Giảng Dạy</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Khối Lớp {c.gradeLevel}
                  </span>
                  <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 font-bold text-xs border border-slate-200">
                    {c.memberCount} HS
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{c.name}</h3>
              </div>

              {/* Hộp mã xác nhận PIN */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-semibold">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" /> Mã PIN vào lớp:
                  </span>
                  <button
                    onClick={() => handleCopy(c.joinCode)}
                    className="font-mono font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-500 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{c.joinCode}</span>
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 flex items-center gap-1 font-semibold">
                    <LinkIcon className="w-3.5 h-3.5 text-emerald-600" /> Link mời:
                  </span>
                  <button
                    onClick={() => handleCopy(c.inviteLink)}
                    className="text-emerald-700 hover:text-emerald-800 font-bold text-xs"
                  >
                    {copiedCode === c.inviteLink ? '✓ Đã sao chép' : 'Sao chép link'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL MỞ LỚP HỌC MỚI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Mở Lớp Học Mới</h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên Lớp Học
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lớp 3B - Chuyên đề Toán Vui"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối Lớp</label>
                <select
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value={1}>Khối 1</option>
                  <option value={2}>Khối 2</option>
                  <option value={3}>Khối 3</option>
                  <option value={4}>Khối 4</option>
                  <option value={5}>Khối 5</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200">
                ℹ️ Sau khi tạo lớp, hệ thống sẽ tự sinh <strong>Mã PIN 6 ký tự</strong> để học sinh nhập từ máy tính bảng xin vào lớp.
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Xác Nhận Mở Lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
