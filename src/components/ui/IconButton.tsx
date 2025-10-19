'use client';
import { motion } from 'framer-motion';

export function IconButton({
  label, children, onClick, id, hasBadge, badgeCount, btnRef
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
  hasBadge?: boolean;
  badgeCount?: number;
  btnRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <motion.button
      ref={btnRef as any}
      id={id}
      type="button"
      aria-haspopup="menu"
      aria-expanded={false}
      aria-controls={id ? `${id}-menu` : undefined}
      title={label}
      onClick={onClick}
      className="relative inline-grid h-9 w-9 place-items-center rounded-md transition hover:bg-[var(--section)]"
      initial="rest" whileHover="hover" animate="rest"
    >
      {children}
      {hasBadge && !!badgeCount && (
        <motion.span
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}
          className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--brand)] text-white text-[11px] leading-[18px] text-center"
        >
          {badgeCount > 9 ? '9+' : badgeCount}
        </motion.span>
      )}
    </motion.button>
  );
}
