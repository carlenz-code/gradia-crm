// ¡NO pongas "use client" aquí!
// Reexporta SOLO exports con nombre.
export {
  motion,
  AnimatePresence,
  LayoutGroup,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';


export const spring340 = { type: 'spring', stiffness: 340, damping: 24 } as const;
export const spring420 = { type: 'spring', stiffness: 420, damping: 28 } as const;

export const fadePop = {
  hidden:  { opacity: 0, y: 8,  scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: spring340 },
  exit:    { opacity: 0, y: 6,  scale: 0.98, transition: { duration: 0.12 } },
} as const;
