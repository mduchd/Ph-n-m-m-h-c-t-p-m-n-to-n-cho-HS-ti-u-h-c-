'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  textToRead: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ textToRead }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
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
    utterance.rate = 0.9; // Đọc chậm rãi, rõ ràng cho học sinh tiểu học nghe

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
        isPlaying
          ? 'bg-amber-400 text-amber-950 animate-pulse'
          : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
      }`}
      title="Bấm để nghe cô đọc câu hỏi"
    >
      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span>{isPlaying ? 'Đang đọc...' : 'Nghe câu hỏi'}</span>
    </button>
  );
};
