'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

interface AudioButtonProps {
  textToRead: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ textToRead }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    sound.playPop();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ đọc giọng nói!');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.88; // Đọc chậm rãi, truyền cảm cho học sinh tiểu học nghe

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs md:text-sm font-black transition-all select-none border-2 border-b-4 ${
        isPlaying
          ? 'bg-amber-300 border-amber-500 text-amber-950 shadow-none translate-y-0.5 animate-pulse'
          : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50 shadow-xs active:translate-y-0.5 active:border-b-2'
      }`}
      title="Bấm để nghe đọc câu hỏi"
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-amber-950 animate-bounce" />
          <span>Đang đọc...</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span>Nghe câu hỏi</span>
        </>
      )}
    </button>
  );
};
