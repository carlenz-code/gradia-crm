'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type FlyoutAlign = 'left' | 'right';

// Layout effect seguro para SSR
const useIso =
  typeof window === 'undefined' ? React.useEffect : useLayoutEffect;

export function Flyout({
  anchorRef,
  open,
  onClose,
  align = 'right',
  width = 360,
  maxWidth = 360,
  children,
  className = '',
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  onClose: () => void;
  align?: FlyoutAlign;
  width?: number;
  maxWidth?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const panelRef = useRef<HTMLDivElement | null>(null);

  const compute = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;

    // Coordenadas en viewport
    const r = el.getBoundingClientRect();

    const gap = 22;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;

    // Base con position: fixed (NO sumar scrollY/scrollX)
    let top = r.bottom + gap;
    let left = align === 'right' ? r.right - width : r.left;

    // Clamp horizontal
    if (left + width > vw - margin) left = Math.max(margin, vw - width - margin);
    if (left < margin) left = margin;

    // Intento de abrir hacia arriba si no entra abajo
    const ph = panelRef.current?.getBoundingClientRect().height ?? 0;
    if (ph && top + ph > vh - margin) {
      const flippedTop = r.top - gap - ph;
      if (flippedTop >= margin) top = flippedTop;
    }

    setPos({ top, left });
  }, [anchorRef, align, width]);

  // Recalcular al abrir + en scroll/resize
  useIso(() => {
    if (!open) return;
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener('scroll', onScroll, true); // capture: true por si hay scroll containers
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, compute]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // SSR guard
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Clic fuera */}
          <div className="fixed inset-0 z-[99998] bg-transparent" onClick={onClose} />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            className={`fixed z-[99999] rounded-2xl border bg-[var(--card)] border-[var(--border)] shadow-xl overflow-visible ${className}`}
            style={{
              top: pos.top,
              left: pos.left,
              width,
              maxWidth: `min(92vw, ${maxWidth}px)`,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export type { FlyoutAlign };
