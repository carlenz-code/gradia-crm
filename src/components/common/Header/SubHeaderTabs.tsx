'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';

type TabItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  items: TabItem[];
  param?: string;
  inline?: boolean;
};

export default function SubHeaderTabs({ items, param = 'tab', inline = false }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const current = search.get(param) ?? items[0]?.value;

  const onSelect = (val: string) => {
    const sp = new URLSearchParams(search.toString());
    sp.set(param, val);
    router.replace(`?${sp.toString()}`, { scroll: false });
  };

  const List = (underlineOffset = 'bottom-0') => (
    <div className="relative flex items-center gap-6 h-12 pb-1">
      {items.map((t) => {
        const isActive = t.value === current;
        return (
          <button
            key={t.value}
            onClick={() => !t.disabled && onSelect(t.value)}
            className={[
              'relative flex items-center gap-2 text-sm transition whitespace-nowrap',
              t.disabled
                ? 'opacity-40 cursor-not-allowed'
                : isActive
                ? 'text-[var(--fg)] font-medium'
                : 'text-[color:var(--muted)] hover:text-[var(--fg)]',
            ].join(' ')}
          >
            {t.icon}
            <span>{t.label}</span>

            {isActive && (
              <motion.span
                layoutId="tabs-underline"
                className={`absolute ${underlineOffset} left-0 right-0 h-[2px] bg-[var(--underline)]`}
              />
            )}
          </button>
        );
      })}
    </div>
  );

  if (inline) {
    // Fijate en overflow-y-hidden y en que el underline ya no usa valores negativos.
    return (
      <nav
        aria-label="Secciones"
        className="relative flex items-center h-10 overflow-x-auto overflow-y-hidden"
      >
        {List('bottom-0')}
      </nav>
    );
  }

  return (
    <div className="backdrop-blur border border-[var(--border)]
                    bg-white/80 dark:bg-neutral-900/70 overflow-y-hidden">
      <Container>{List('bottom-0')}</Container>
    </div>
  );
}
