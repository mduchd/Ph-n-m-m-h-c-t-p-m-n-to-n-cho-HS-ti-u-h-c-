'use client';

import React from 'react';
import { m, type HTMLMotionProps } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { sound } from '@/lib/sound';
import { playfulSpring } from '@/lib/motion';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'yellow' | 'green' | 'orange' | 'blue' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg';
  playSound?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'yellow',
  size = 'md',
  playSound = true,
  isLoading = false,
  loadingText,
  children,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
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
    <m.button
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      whileHover={disabled || isLoading ? undefined : { y: -2, scale: 1.015 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={playfulSpring}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          {loadingText ? <span>{loadingText}</span> : children}
        </>
      ) : (
        children
      )}
    </m.button>
  );
};
