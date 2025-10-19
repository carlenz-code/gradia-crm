'use client';
import Link from 'next/link';
import { useCallback, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Notification } from 'iconsax-react';
import { Flyout } from '@/components/ui/Flyout';
import { IconButton } from '@/components/ui/IconButton';
import { MenuSectionTitle } from '@/components/ui/MenuPrimitives';
import { spring420 } from '@/lib/utils/motion';

type NotificationItem = { id: string; title: string; desc?: string; time: string; unread?: boolean; href?: string };

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const btnId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close  = useCallback(() => setOpen(false), []);

  const items: NotificationItem[] = [
    { id: 'n1', title: 'Nueva entrega',          desc: 'María R. subió su tarea 02', time: 'hace 2m', unread: true, href: '/tasks/02' },
    { id: 'n2', title: 'Calificación publicada', desc: 'Tarea 01 (Sección A)',       time: 'hace 40m', href: '/grades' },
    { id: 'n3', title: 'Evento hoy',             desc: 'Sesión síncrona 7:00 pm',    time: 'hace 3h',  href: '/calendar' },
  ];
  const badge = items.filter(i => i.unread).length;

  return (
    <div className="relative">
      <IconButton id={btnId} label="Notificaciones" onClick={toggle} hasBadge badgeCount={badge} btnRef={btnRef}>
        <Notification size={24} color="var(--icon)" variant="Outline" />
      </IconButton>

      <Flyout anchorRef={btnRef} open={open} onClose={close} align="right" width={360}>
        <div className="px-3.5 pt-3 pb-2 flex items-center">
          <span className="text-[12px] font-medium uppercase tracking-wide text-[color:var(--muted)]">Notificaciones</span>
          <button type="button" className="ml-auto text-[12px] text-[var(--brand)] hover:underline">Marcar todo como leído</button>
        </div>

        <ul id={`${btnId}-menu`} role="menu" aria-labelledby={btnId} className="px-2.5 pb-2">
          {items.map((n, i) => {
            const Row = (
              <div className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 hover:bg-[var(--section)] transition">
                <span className="inline-grid place-items-center h-8 w-8 rounded-lg bg-[var(--section)] border border-[var(--border)]">
                  <Notification size={18} color="var(--icon)" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-[var(--fg)] truncate">{n.title}</span>
                    <span className="text-[11px] text-[color:var(--muted)] ml-auto">{n.time}</span>
                  </div>
                  {n.desc && <p className="text-[12px] text-[var(--fg)]/80 line-clamp-2">{n.desc}</p>}
                </div>
                {n.unread && <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand)]" />}
              </div>
            );
            return (
              <motion.li key={n.id}
                role="none"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring420, delay: 0.05 + i * 0.035 }}>
                {n.href ? <Link href={n.href} role="menuitem" onClick={close} className="block">{Row}</Link> : Row}
              </motion.li>
            );
          })}
        </ul>

        <div className="px-3.5 pb-3 pt-1">
          <Link href="/notifications" onClick={close}
            className="w-full inline-flex justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-[13px] hover:bg-[var(--section)] transition">
            Ver todas las notificaciones
          </Link>
        </div>
      </Flyout>
    </div>
  );
}
