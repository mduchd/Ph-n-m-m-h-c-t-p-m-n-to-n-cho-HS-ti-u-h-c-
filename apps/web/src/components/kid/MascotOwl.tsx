'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { gentleSpring } from '@/lib/motion';

interface MascotOwlProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'waving' | 'thinking' | 'celebrating';
  speechBubble?: string;
  className?: string;
}

export const MascotOwl: React.FC<MascotOwlProps> = ({
  size = 'md',
  mood = 'waving',
  speechBubble,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const sizeDims = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Optional Speech Bubble */}
      {speechBubble && (
        <m.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={gentleSpring}
          className="relative mb-3 max-w-xs bg-white border-2 border-amber-200 px-4 py-2.5 rounded-2xl shadow-sm text-xs md:text-sm font-extrabold text-slate-800 text-center"
        >
          <span>{speechBubble}</span>
          {/* Tail of speech bubble */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-amber-200 rotate-45" />
        </m.div>
      )}

      {/* SVG Owl Character */}
      <m.div
        className={sizeDims}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04, rotate: 1 }}
        animate={
          shouldReduceMotion
            ? undefined
            : mood === 'thinking'
              ? { rotate: [-1, 1, -1] }
              : mood === 'celebrating'
                ? { y: [0, -7, 0], rotate: [0, -2, 2, 0] }
                : { y: [0, -2, 0] }
        }
        transition={
          mood === 'celebrating'
            ? { duration: 0.65, ease: 'easeOut' }
            : { duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }
        }
      >
        <svg
          viewBox="0 0 160 160"
          className="h-full w-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
        {/* Glow / Shadow at base */}
        <ellipse cx="80" cy="148" rx="42" ry="7" fill="#E2D4C0" />

        {/* Feet */}
        <ellipse cx="64" cy="142" rx="10" ry="5" fill="#FF8F00" />
        <ellipse cx="96" cy="142" rx="10" ry="5" fill="#FF8F00" />

        {/* Main Body */}
        <ellipse cx="80" cy="95" rx="52" ry="50" fill="#FFA726" />
        {/* Wing Left */}
        <path
          d="M32 85 C22 100 24 125 40 120 C42 110 38 95 32 85 Z"
          fill="#FB8C00"
        />
        {/* Wing Right (Waving if waving or celebrating) */}
        {mood === 'waving' || mood === 'celebrating' ? (
          <m.path
            d="M125 75 C142 60 152 75 135 100 C125 95 124 85 125 75 Z"
            fill="#FB8C00"
            style={{ transformOrigin: '125px 100px' }}
            animate={shouldReduceMotion ? undefined : { rotate: [-4, 15, -4] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
          />
        ) : (
          <path
            d="M128 85 C138 100 136 125 120 120 C118 110 122 95 128 85 Z"
            fill="#FB8C00"
          />
        )}

        {/* Belly patch */}
        <ellipse cx="80" cy="105" rx="35" ry="32" fill="#FFF8E1" />
        {/* Cute feather specks on belly */}
        <path d="M72 96 Q80 100 88 96" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M68 108 Q76 112 84 108" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M78 119 Q86 123 94 119" stroke="#FFE082" strokeWidth="2.5" strokeLinecap="round" />

        {/* Face Disc / Eyes background */}
        <ellipse cx="62" cy="74" rx="20" ry="20" fill="#FFFFFF" stroke="#FFE082" strokeWidth="2" />
        <ellipse cx="98" cy="74" rx="20" ry="20" fill="#FFFFFF" stroke="#FFE082" strokeWidth="2" />

        {/* Eyeballs (Looking friendly and big) */}
        <circle cx="64" cy="74" r="10" fill="#3E2723" />
        <circle cx="96" cy="74" r="10" fill="#3E2723" />
        {/* Eye highlights */}
        <circle cx="61" cy="70" r="3.5" fill="#FFFFFF" />
        <circle cx="66" cy="77" r="1.5" fill="#FFFFFF" />
        <circle cx="93" cy="70" r="3.5" fill="#FFFFFF" />
        <circle cx="98" cy="77" r="1.5" fill="#FFFFFF" />

        {/* Cute Round Glasses */}
        <circle cx="62" cy="74" r="19" fill="none" stroke="#5D4037" strokeWidth="3" />
        <circle cx="98" cy="74" r="19" fill="none" stroke="#5D4037" strokeWidth="3" />
        <path d="M81 74 L79 74" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

        {/* Beak */}
        <polygon points="80,78 72,89 88,89" fill="#FF6F00" />

        {/* Rosy Cheeks */}
        <circle cx="46" cy="85" r="7" fill="#FF8A80" opacity="0.6" />
        <circle cx="114" cy="85" r="7" fill="#FF8A80" opacity="0.6" />

        {/* Graduation Cap */}
        <polygon points="80,24 125,37 80,48 35,37" fill="#1E88E5" />
        <path d="M52 42 L52 54 C52 62 108 62 108 54 L108 42" fill="#1565C0" />
        {/* Cap Button & Tassel */}
        <circle cx="80" cy="36" r="3" fill="#FFD54F" />
        <path d="M80 36 C92 37 102 44 104 54" stroke="#FFD54F" strokeWidth="2.5" fill="none" />
        <rect x="102" y="52" width="4" height="7" rx="1" fill="#FFC107" />
        </svg>
      </m.div>
    </div>
  );
};
