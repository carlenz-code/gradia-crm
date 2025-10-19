'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun1 } from 'iconsax-react';

export default function ThemeToggleMenuItem({ className = '' }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === 'system' ? systemTheme : theme;
  const isDark = current === 'dark';

  return (
    <div className={`menu-row ${className}`}>
      <span className="menu-icon">
        {isDark ? <Moon size={18} color="var(--icon)" /> : <Sun1 size={18} color="var(--icon)" />}
      </span>
      <span className="menu-text">Modo oscuro</span>

      {/* Switch */}
      <button
        type="button"
        aria-pressed={isDark}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={[
          'ml-auto relative inline-flex h-5 w-9 items-center rounded-full border transition',
          'bg-[var(--card)] border-[var(--border)]',
          isDark ? 'ring-2 ring-[var(--brand)]' : '',
        ].join(' ')}
        title="Alternar modo oscuro"
      >
        <span
          className={[
            'inline-block h-4 w-4 rounded-full transform transition',
            isDark ? 'translate-x-4 bg-[var(--brand)]' : 'translate-x-1 bg-[var(--fg)]',
          ].join(' ')}
        />
      </button>
    </div>
  );
}
