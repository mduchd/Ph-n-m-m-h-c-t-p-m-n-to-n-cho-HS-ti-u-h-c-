'use client';

import React, { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BookOpen, Plus, Globe2, Lock, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { TactileButton } from '@/components/kid/TactileButton';
import { MotionDialog } from '@/components/motion/MotionDialog';
import { sound } from '@/lib/sound';
import { cardMotion, gentleSpring, listItemVariants, staggerContainerVariants } from '@/lib/motion';

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
      visibility: 'PUBLIC',
      questionCount: 8,
      createdAt: 'Hôm qua',
    },
    {
      id: 'lib-2',
      title: 'Ghi chép riêng các từ ghép Tiếng Việt khó nhớ',
      subject: 'Tiếng Việt',
      visibility: 'PRIVATE',
      questionCount: 5,
      createdAt: '3 ngày trước',
    },
    {
      id: 'lib-3',
      title: 'Bài tập tình huống: Ứng phó khi bị lạc',
      subject: 'Kỹ năng sống',
      visibility: 'PUBLIC',
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
    sound.playPop();
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

    sound.playSuccess();
    const newItem: LibraryItemState = {
      id: `lib-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      visibility: newVisibility,
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
          <span className="text-xs font-black text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
            Kho Ôn Tập Tự Học
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-black text-slate-800 mt-2">
            Thư Viện Của Bạn
          </h1>
          <p className="text-slate-600 text-sm font-semibold mt-1">
            Nơi lưu trữ các bộ bài tập bé tự tạo. Bé có thể để <strong className="text-emerald-600 font-bold">Công khai</strong> cho cả lớp cùng làm, hoặc <strong className="text-slate-700 font-bold">Riêng tư</strong> để tự ôn!
          </p>
        </div>

        <TactileButton
          variant="yellow"
          size="md"
          onClick={() => {
            sound.playPop();
            setShowCreateModal(true);
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Tạo Bộ Bài Tập Mới</span>
        </TactileButton>
      </div>

      {/* Bộ lọc trạng thái dạng Tactile Chips */}
      <div className="flex items-center gap-2">
        <m.button
          onClick={() => {
            sound.playPop();
            setFilter('ALL');
          }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          animate={filter === 'ALL' ? { y: -2 } : { y: 0 }}
          transition={gentleSpring}
          className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-black transition-colors select-none border-2 ${
            filter === 'ALL'
              ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-tactile-yellow'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
          }`}
        >
          Tất cả ({items.length})
        </m.button>
        <m.button
          onClick={() => {
            sound.playPop();
            setFilter('PUBLIC');
          }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          animate={filter === 'PUBLIC' ? { y: -2 } : { y: 0 }}
          transition={gentleSpring}
          className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-black transition-colors flex items-center gap-1.5 select-none border-2 ${
            filter === 'PUBLIC'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-tactile-green'
              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          Công khai ({items.filter((i) => i.visibility === 'PUBLIC').length})
        </m.button>
        <m.button
          onClick={() => {
            sound.playPop();
            setFilter('PRIVATE');
          }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          animate={filter === 'PRIVATE' ? { y: -2 } : { y: 0 }}
          transition={gentleSpring}
          className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-black transition-colors flex items-center gap-1.5 select-none border-2 ${
            filter === 'PRIVATE'
              ? 'bg-slate-700 border-slate-800 text-white shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          Riêng tư ({items.filter((i) => i.visibility === 'PRIVATE').length})
        </m.button>
      </div>

      {/* Danh sách các bài tập trong thư viện */}
      <m.div layout variants={staggerContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
        {filteredItems.map((item) => (
          <m.div
            key={item.id}
            layout
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.14 } }}
            whileHover={cardMotion.whileHover}
            transition={gentleSpring}
            className="bg-white rounded-4xl border-2 border-kid-border p-6 shadow-xs hover:border-amber-400 hover:shadow-tactile-yellow transition-colors flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                  {item.subject}
                </span>

                {/* NÚT CHUYỂN TRẠNG THÁI CÔNG KHAI / RIÊNG TƯ */}
                <m.button
                  onClick={() => toggleVisibility(item.id)}
                  whileTap={{ scale: 0.95 }}
                  transition={gentleSpring}
                  className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full border-2 transition-colors select-none ${
                    item.visibility === 'PUBLIC'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                  title="Bấm để đổi chế độ Công khai hoặc Riêng tư"
                >
                  {item.visibility === 'PUBLIC' ? (
                    <>
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Công khai</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Riêng tư</span>
                    </>
                  )}
                </m.button>
              </div>

              <h3 className="font-display font-black text-slate-800 text-base leading-snug line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {item.questionCount} câu hỏi • Tạo lúc {item.createdAt}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-kid-border flex items-center justify-between">
              <button
                onClick={() => sound.playPop()}
                className="text-xs font-black text-amber-700 hover:text-amber-900"
              >
                Vào ôn bài ngay →
              </button>
              <button
                onClick={() => toggleVisibility(item.id)}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline"
              >
                Đổi quyền
              </button>
            </div>
          </m.div>
        ))}
        </AnimatePresence>
      </m.div>

      {/* MODAL TẠO BÀI ÔN TẬP MỚI */}
      <MotionDialog
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        ariaLabel="Tạo bộ ôn tập mới"
        panelClassName="bg-white rounded-4xl max-w-md w-full p-6 md:p-8 shadow-2xl space-y-6 border-2 border-kid-border relative"
      >
            <div className="flex items-center justify-between border-b-2 border-kid-border pb-3">
              <h3 className="font-display text-lg font-black text-slate-800">Tạo Bộ Ôn Tập Mới</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  Tiêu đề bộ bài tập:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ôn tập 5 câu đố vui Toán học"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-semibold focus:border-amber-400 focus:outline-none bg-amber-50/20"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Môn học:</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold focus:border-amber-400 focus:outline-none bg-white"
                >
                  <option value="Toán học">Toán học</option>
                  <option value="Tiếng Việt">Tiếng Việt</option>
                  <option value="Kỹ năng sống">Kỹ năng sống</option>
                  <option value="Tiếng Anh">Tiếng Anh</option>
                </select>
              </div>

              {/* LỰA CHỌN TRẠNG THÁI: CÔNG KHAI HOẶC RIÊNG TƯ */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">
                  Trạng thái chia sẻ:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <m.button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setNewVisibility('PRIVATE');
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    animate={newVisibility === 'PRIVATE' ? { scale: 1.015 } : { scale: 1 }}
                    transition={gentleSpring}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-colors ${
                      newVisibility === 'PRIVATE'
                        ? 'border-slate-800 bg-slate-100 text-slate-900 font-black shadow-tactile-white'
                        : 'border-slate-200 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black mb-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Riêng tư</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-semibold">Chỉ mình em xem và luyện tập</p>
                  </m.button>

                  <m.button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setNewVisibility('PUBLIC');
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    animate={newVisibility === 'PUBLIC' ? { scale: 1.015 } : { scale: 1 }}
                    transition={gentleSpring}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-colors ${
                      newVisibility === 'PUBLIC'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black shadow-tactile-green'
                        : 'border-slate-200 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black mb-1 text-emerald-700">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Công khai</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-semibold">Cho phép bạn bè cùng ôn tập</p>
                  </m.button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <TactileButton
                  variant="white"
                  size="sm"
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Hủy
                </TactileButton>
                <TactileButton
                  variant="yellow"
                  size="md"
                  type="submit"
                >
                  <span>Lưu Vào Thư Viện</span>
                </TactileButton>
              </div>
            </form>
      </MotionDialog>
    </div>
  );
}
