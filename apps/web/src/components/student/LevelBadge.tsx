'use client';

import React from 'react';
import { ProficiencyLevel } from '@kid-elearning/types';
import { Award, Zap, Trophy } from 'lucide-react';

interface LevelBadgeProps {
  level: ProficiencyLevel;
  score?: number;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, score }) => {
  const configs = {
    BASIC: {
      label: 'Cơ bản',
      icon: Award,
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Nắm vững kiến thức nền tảng, hoàn thành tốt các bài tập chuẩn',
    },
    APPLIED: {
      label: 'Vận dụng',
      icon: Zap,
      bg: 'bg-sky-100 text-sky-800 border-sky-300',
      description: 'Biết cách liên hệ thực tế, giải toán có lời văn và giải quyết tình huống',
    },
    ADVANCED: {
      label: 'Vận dụng cao',
      icon: Trophy,
      bg: 'bg-purple-100 text-purple-800 border-purple-300',
      description: 'Tư duy logic sắc bén, giải các bài toán đố thông minh và tư duy phản biện',
    },
  }[level];

  const Icon = configs.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-black text-sm shadow-sm ${configs.bg}`}>
      <Icon className="w-5 h-5" />
      <span>Trình độ: {configs.label}</span>
      {score !== undefined && <span className="opacity-75">({score} điểm)</span>}
    </div>
  );
};
