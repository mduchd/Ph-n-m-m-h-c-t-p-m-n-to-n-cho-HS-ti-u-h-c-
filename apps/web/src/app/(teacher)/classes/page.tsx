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

  // Modal tạo lớp mới
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
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Quản Lý Lớp Học & Phê Duyệt Học Sinh
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Tạo lớp, cung cấp mã xác nhận để học sinh xin tham gia và kiểm duyệt danh sách.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Mở Lớp Học Mới</span>
        </button>
      </div>

      {/* DANH SÁCH HỌC SINH ĐANG CHỜ PHÊ DUYỆT (Realtime Approval) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-800">
              Yêu Cầu Tham Gia Chờ Duyệt ({pendingRequests.length})
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Học sinh nhập đúng mã xác nhận mới được gửi yêu cầu
          </span>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-400 text-sm">
            ✨ Không có học sinh nào đang chờ duyệt.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    {req.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{req.studentName}</h3>
                    <p className="text-xs text-slate-500">Xin vào: {req.className}</p>
                    <span className="text-[10px] text-amber-700 font-semibold">{req.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1 text-xs font-bold"
                    title="Phê duyệt vào lớp"
                  >
                    <Check className="w-4 h-4" />
                    <span>Duyệt</span>
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="p-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-all"
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
        <h2 className="text-lg font-bold text-slate-800">Danh Sách Các Lớp Đang Mở</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Khối {c.gradeLevel}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-2">{c.name}</h3>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold text-sm">
                  {c.memberCount} HS
                </div>
              </div>

              {/* Hộp mã xác nhận & link mời */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-semibold">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" /> Mã xác nhận:
                  </span>
                  <button
                    onClick={() => handleCopy(c.joinCode)}
                    className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 hover:border-emerald-500 flex items-center gap-1"
                  >
                    <span>{c.joinCode}</span>
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-semibold">
                    <LinkIcon className="w-3.5 h-3.5 text-emerald-600" /> Link mời:
                  </span>
                  <button
                    onClick={() => handleCopy(c.inviteLink)}
                    className="text-emerald-600 hover:underline font-bold"
                  >
                    {copiedCode === c.inviteLink ? 'Đã sao chép!' : 'Sao chép link'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL MỞ LỚP HỌC MỚI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Mở Lớp Học Mới</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
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
                  placeholder="Ví dụ: Lớp 4B - Chuyên đề Toán Vui"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Khối Lớp</label>
                <select
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value={1}>Khối 1</option>
                  <option value={2}>Khối 2</option>
                  <option value={3}>Khối 3</option>
                  <option value={4}>Khối 4</option>
                  <option value={5}>Khối 5</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800">
                ℹ️ Sau khi mở lớp, hệ thống sẽ tự động tạo <strong>Mã xác nhận 6 số/chữ</strong>. Học sinh bắt buộc phải nhập mã này thì bạn mới nhận được yêu cầu để duyệt vào lớp.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md"
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
