'use client';

import React from 'react';
import { sound } from '@/lib/sound';

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'yellow' | 'green' | 'orange' | 'blue' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg';
  playSound?: boolean;
  children: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'yellow',
  size = 'md',
  playSound = true,
  children,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (playSound) {
      sound.playPop();
    }
    if (onClick) {
      onClick(e);
    }
  };

  const variantClass = {
    yellow: 'btn-tactile-yellow',
    green: 'btn-tactile-green',
    orange: 'btn-tactile-orange',
    blue: 'btn-tactile-blue',
    purple: 'btn-tactile-purple',
    white: 'btn-tactile-white',
  }[variant];

  const sizeClass = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl',
    md: 'px-5 py-2.5 text-sm md:text-base rounded-2xl',
    lg: 'px-7 py-3.5 text-base md:text-lg rounded-3xl',
  }[size];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
