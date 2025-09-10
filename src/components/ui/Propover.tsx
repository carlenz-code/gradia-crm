'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { popoverVariants } from '@/lib/animations';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  align?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

export default function Popover({ isOpen, onClose, align = 'right', className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    function onEsc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          role="menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popoverVariants}           // ✅ ahora coincide con Variants
          style={{ transformOrigin: align === 'right' ? 'top right' : 'top left' }}
          className={[
            'absolute top-12 w-56 overflow-hidden rounded-2xl border bg-white shadow-lg',
            align === 'right' ? 'right-0' : 'left-0',
            className ?? '',
          ].join(' ')}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
