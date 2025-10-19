// src/lib/animations.ts
import type { Variants } from 'framer-motion';

export const popoverVariants: Variants = {
  hidden:  { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.6 },
  },
  exit:    { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } },
};

// micro-interacciones
export const tapScale = { whileTap: { scale: 0.96 } };
export const hoverFade = { whileHover: { opacity: 0.75 } };
