import type { Transition, Variants } from 'framer-motion';

export const motionDurations = {
  instant: 0.08,
  fast: 0.14,
  normal: 0.22,
  slow: 0.36,
} as const;

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 30,
  mass: 0.7,
};

export const playfulSpring: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 24,
  mass: 0.65,
};

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.normal, ease: motionEase },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.025,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionDurations.normal, ease: motionEase },
  },
};

export const dialogBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: motionDurations.fast } },
  exit: { opacity: 0, transition: { duration: motionDurations.fast } },
};

export const dialogPanelVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: gentleSpring },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: motionDurations.fast, ease: motionEase },
  },
};

export const cardMotion = {
  whileHover: { y: -3, scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: gentleSpring,
} as const;

