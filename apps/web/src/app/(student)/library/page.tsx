'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Globe2, Lock, Sparkles, Filter } from 'lucide-react';

interface LibraryItemState {
  id: string;
  title: string;
  subject: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  questionCount: number;
  createdAt: string;
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItemState[]>([
    {
      id: 'lib-1',
      title: 'Bộ câu hỏi đố vui Toán cộng có nhớ',
      subject: 'Toán học',
      visibility: 'PUBLIC', // Công khai
      questionCount: 8,
      createdAt: 'Hôm qua',
    },
    {
      id: 'lib-2',
      title: 'Ghi chép riêng các từ ghép Tiếng Việt khó nhớ',
      subject: 'Tiếng Việt',
      visibility: 'PRIVATE', // Riêng tư
      questionCount: 5,
      createdAt: '3 ngày trước',
    },
    {
      id: 'lib-3',
      title: 'Bài tập tình huống: Ứng phó khi bị lạc',
      subject: 'Kỹ năng sống',
      visibility: 'PUBLIC', // Công khai
      questionCount: 4,
      createdAt: '1 tuần trước',
    },
  ]);

  const [filter, setFilter] = useState<'ALL' | 'PUBLIC' | 'PRIVATE'>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Toán học');
  const [newVisibility, setNewVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PRIVATE');

  const toggleVisibility = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, visibility: item.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC' }
          : item,
      ),
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: LibraryItemState = {
      id: `lib-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      visibility: newVisibility, // HS tự chọn: Công khai hoặc Riêng tư
      questionCount: 1,
      createdAt: 'Vừa xong',
    };

    setItems([newItem, ...items]);
    setNewTitle('');
    setShowCreateModal(false);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'ALL') return true;
    return item.visibility === filter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Tiêu đề & Nút Tạo mới */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Kho Ôn Tập Tự Học
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-2">
            Thư Viện Của Bạn
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Nơi lưu trữ các bài tập bạn tự tạo ra để ôn tập. Bạn có thể chọn chế độ{' '}
            <strong className="text-emerald-600">Công khai</strong> để bạn bè cùng ôn, hoặc{' '}
            <strong className="text-slate-700">Riêng tư</strong> chỉ mình bạn xem.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tạo Bài Ôn Tập Mới</span>
        </button>
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'ALL'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tất cả ({items.length})
        </button>
        <button
          onClick={() => setFilter('PUBLIC')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filter === 'PUBLIC'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          Công khai ({items.filter((i) => i.visibility === 'PUBLIC').length})
        </button>
        <button
          onClick={() => setFilter('PRIVATE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filter === 'PRIVATE'
              ? 'bg-slate-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          Riêng tư ({items.filter((i) => i.visibility === 'PRIVATE').length})
        </button>
      </div>

      {/* Danh sách các bài tập trong thư viện */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">
                  {item.subject}
                </span>

                {/* NÚT CHUYỂN TRẠNG THÁI CÔNG KHAI / RIÊNG TƯ */}
                <button
                  onClick={() => toggleVisibility(item.id)}
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                    item.visibility === 'PUBLIC'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                  title="Bấm để đổi trạng thái Công khai hoặc Riêng tư"
                >
                  {item.visibility === 'PUBLIC' ? (
                    <>
                      <Globe2 className="w-3 h-3" />
                      <span>Công khai</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      <span>Riêng tư</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {item.questionCount} câu hỏi • Tạo lúc {item.createdAt}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button className="text-xs font-bold text-sky-600 hover:text-sky-700">
                Bắt đầu ôn bài →
              </button>
              <button
                onClick={() => toggleVisibility(item.id)}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline"
              >
                Đổi quyền
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL TẠO BÀI ÔN TẬP MỚI */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Tạo Đề Ôn Tập Mới</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề bài tập
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ôn tập 5 câu đố vui Toán học"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Môn học</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Toán học">Toán học</option>
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="Kỹ năng sống">Kỹ năng sống</option>
                  <option value="Tiếng Anh">Tiếng Anh</option>
                </select>
              </div>

              {/* LỰA CHỌN TRẠNG THÁI: CÔNG KHAI HOẶC RIÊNG TƯ */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Trạng thái chia sẻ
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewVisibility('PRIVATE')}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      newVisibility === 'PRIVATE'
                        ? 'border-slate-800 bg-slate-50 text-slate-900 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Riêng tư</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Chỉ mình em xem và luyện tập</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewVisibility('PUBLIC')}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      newVisibility === 'PUBLIC'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                      <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Công khai</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Cho phép các bạn khác cùng làm</p>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl shadow-md"
                >
                  Lưu Vào Thư Viện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
