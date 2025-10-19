'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from '@/lib/utils/motion'; // ✅

import { popoverVariants } from '@/lib/utils/animations';

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
          // ❌ NO pongas role aquí; el contenido interior define su semántica (menu/list/dialog…)
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popoverVariants}
          style={{ transformOrigin: align === 'right' ? 'top right' : 'top left' }}
          className={[
            'absolute top-12 w-56 overflow-hidden rounded-2xl border shadow-lg z-50',
            // tokens para light/dark:
            'bg-[var(--card)] border-[var(--border)] text-[var(--fg)]',
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
