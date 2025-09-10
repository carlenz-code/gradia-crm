'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type TabItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  items: TabItem[];
  param?: string;
};

export default function SubHeaderTabs({ items, param = 'tab' }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const current = search.get(param) ?? items[0]?.value;

  const onSelect = (val: string) => {
    const sp = new URLSearchParams(search.toString());
    sp.set(param, val);
    router.replace(`?${sp.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white/80 backdrop-blur border">
      {/* Aquí el contenedor con border y márgenes */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:px-[120px] ">
        <div className="relative flex h-12 items-center gap-6">
          {items.map((t) => {
            const isActive = t.value === current;
            return (
              <button
                key={t.value}
                onClick={() => !t.disabled && onSelect(t.value)}
                className={[
                  "relative flex items-center gap-2 text-sm transition",
                  t.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : isActive
                      ? "text-black font-medium"
                      : "text-gray-500 hover:text-black",
                ].join(' ')}
              >
                {t.icon}
                <span>{t.label}</span>

                {isActive && (
                  <motion.span
                    layoutId="tabs-underline"
                    className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-black"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

