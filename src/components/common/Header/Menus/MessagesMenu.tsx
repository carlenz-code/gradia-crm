'use client';
import Link from 'next/link';
import { useCallback, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageText1 } from 'iconsax-react';
import { Flyout } from '@/components/ui/Flyout';
import { IconButton } from '@/components/ui/IconButton';
import { MenuSectionTitle, MenuList } from '@/components/ui/MenuPrimitives';
import { getMessages } from '@/lib/services/api/messages.service';
import type { MessageItem } from '@/types/header';
import { spring420 } from '@/lib/utils/motion';

export function MessagesMenu() {
  const [open, setOpen] = useState(false);
  const [data] = useState<{ items: MessageItem[]; unread: number }>(() => {
    // mock local; reemplaza por hook async si quieres
    // (useEffect + setState) cuando conectes API
    // @ts-ignore
    return awaitWrap();
  });
  const btnId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close  = useCallback(() => setOpen(false), []);

  function awaitWrap() {
    // sincronizamos el mock (sin async) para simplificar
    // en real: usa useEffect(async () => setData(await getMessages()), [])
    return { items: [
      { id: '1', from: 'Jorge C.', text: 'Subí la rúbrica al curso de Redes', time: 'hace 5m', unread: true },
      { id: '2', from: 'Karen S.', text: '¿Confirmas la demo del lunes?',     time: 'hace 1h' },
      { id: '3', from: 'Equipo Grad.IA', text: 'Se publicó la nueva versión', time: 'ayer' },
    ], unread: 1 };
  }

  const badge = data.unread;

  return (
    <div className="relative">
      <IconButton id={btnId} label="Mensajes" onClick={toggle} hasBadge badgeCount={badge} btnRef={btnRef}>
        <MessageText1 size={24} color="var(--icon)" />
      </IconButton>

      <Flyout anchorRef={btnRef} open={open} onClose={close} align="right" width={340}>
        <MenuSectionTitle>Mensajes</MenuSectionTitle>
        <MenuList id={`${btnId}-menu`} aria-labelledby={btnId} className="px-2.5 pb-2">
          {data.items.map((m, i) => (
            <motion.li key={m.id}
              role="none"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring420, delay: 0.05 + i * 0.035 }}>
              <Link
                href={`/messages/${m.id}`} onClick={close} role="menuitem"
                className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 hover:bg-[var(--section)] transition"
              >
                <span className="inline-grid place-items-center h-8 w-8 rounded-full bg-[var(--brand)]/10 border border-[var(--border)] text-[12px] text-[var(--brand)]">
                  {m.from.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-[var(--fg)] truncate">{m.from}</span>
                    <span className="text-[11px] text-[color:var(--muted)] ml-auto">{m.time}</span>
                  </div>
                  <p className="text-[12px] text-[var(--fg)]/80 line-clamp-2">{m.text}</p>
                </div>
                {m.unread && <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand)]" />}
              </Link>
            </motion.li>
          ))}
        </MenuList>

        <div className="px-3.5 pb-3 pt-1">
          <Link href="/messages" onClick={close}
            className="w-full inline-flex justify-center rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-[13px] hover:bg-[var(--section)] transition">
            Ver todos los mensajes
          </Link>
        </div>
      </Flyout>
    </div>
  );
}
