'use client';
import Link from 'next/link';
import { useCallback, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Category2 } from 'iconsax-react';
import { Flyout } from '@/components/ui/Flyout';
import { IconButton } from '@/components/ui/IconButton';
import { MenuSectionTitle } from '@/components/ui/MenuPrimitives';
import { apps } from '@/lib/services/api/apps.service';
import { spring420 } from '@/lib/utils/motion';

export function AppsMenu() {
  const [open, setOpen] = useState(false);
  const btnId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close  = useCallback(() => setOpen(false), []);

  return (
    <div className="relative">
      <IconButton id={btnId} label="Apps" onClick={toggle} btnRef={btnRef}>
        <Category2 size={24} color="var(--brand)" variant="Outline" />
      </IconButton>

      <Flyout anchorRef={btnRef} open={open} onClose={close} align="right" width={360}>
        <MenuSectionTitle>Aplicaciones</MenuSectionTitle>
        <div className="px-3.5 pb-3 grid grid-cols-3 gap-2.5">
          {apps.map((a, i) => (
  <motion.div key={i} /* ... */>
    <Link href={a.href} onClick={close} className="group flex flex-col items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 hover:bg-[var(--section)] transition">
      <span className="inline-grid place-items-center h-10 w-10 rounded-lg bg-[var(--section)] border border-[var(--border)]">
        <a.Icon size={20} color="var(--icon)" />   {/* <- aquí */}
      </span>
      <span className="text-[12px] text-[var(--fg)] group-hover:text-[var(--brand)]">{a.label}</span>
    </Link>
  </motion.div>
))}
        </div>
      </Flyout>
    </div>
  );
}
