'use client';

import Link from 'next/link';
import { useCallback, useId, useState } from 'react';
import Popover from '@/components/ui/Propover';
import ThemeToggleMenuItem from '@/components/common/Header/UserMenu/ThemeToggleMenuItem';
import type { MinimalUser } from '@/lib/types';
import {
  TagUser, Book, Award, AlignBottom,
  MessageQuestion, Setting2, Logout, Briefcase
} from 'iconsax-react';

type Props = { user: MinimalUser };

export default function UserMenu({ user }: Props) {
  const [open, setOpen] = useState(false);
  const btnId = useId();
  const isTeacher = user.role === 'TEACHER';
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close  = useCallback(() => setOpen(false), []);

  return (
    <div className="relative flex items-center gap-2">
      {/* Botón de apertura (mantenemos nombre/org al lado del avatar superior del header) */}
      <button
        id={btnId}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${btnId}-menu`}
        className="flex items-center gap-2"
      >
        {/* circulito de rol también puede usarse aquí si quieres quitar el avatar del header */}
        <span className="inline-grid place-items-center h-9 w-9 rounded-full bg-[var(--brand)] text-white text-sm">
          {user.name.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase()}
        </span>
        <div className="hidden sm:block text-left">
          <div className="text-[14px] font-medium text-[var(--fg)]">{user.name}</div>
          <div className="text-[12px] text-[color:var(--muted)]">{user.org ?? ''}</div>
        </div>
      </button>

      <Popover isOpen={open} onClose={close} align="right" className="mt-3">
        {/* === Cabecera compacta con círculo + texto del rol === */}
        <MenuHeader
          roleLabel={isTeacher ? 'Docente' : 'Estudiante'}
          // círculo 24px (h-6 w-6) y el icono 14px; el texto va a 14px para que se “vea” del mismo tamaño
          iconName={isTeacher ? 'teacher' : 'student'}
        />

        {/* === Items === */}
        <ul id={`${btnId}-menu`} role="menu" aria-labelledby={btnId} className="pb-2">
          <li role="none">
            <MenuLink href="/profile" onSelect={close} icon={<TagUser size={18} color="var(--icon)" />}>
              Perfil
            </MenuLink>
          </li>

          {isTeacher ? (
            <li role="none">
              <MenuLink href="/courses" onSelect={close} icon={<Book size={18} color="var(--icon)" />}>
                Mis cursos
              </MenuLink>
            </li>
          ) : (
            <>
              <li role="none">
                <MenuLink href="/certificates" onSelect={close} icon={<Award size={18} color="var(--icon)" />}>
                  Certificados
                </MenuLink>
              </li>
              <li role="none">
                <MenuLink href="/grades" onSelect={close} icon={<AlignBottom size={18} color="var(--icon)" />}>
                  Calificaciones
                </MenuLink>
              </li>
            </>
          )}

          <li role="none"><MenuDivider /></li>

          <li role="none">
            <MenuLink href="/help" onSelect={close} icon={<MessageQuestion size={18} color="var(--icon)" />}>
              Centro de ayuda
            </MenuLink>
          </li>
          <li role="none">
            <MenuLink href="/settings" onSelect={close} icon={<Setting2 size={18} color="var(--icon)" />}>
              Ajustes
            </MenuLink>
          </li>

          {/* Toggle modo oscuro, alineado a la misma “fila de menú” */}
          <li role="none">
            <ThemeToggleMenuItem className="menu-row" />
          </li>

          <li role="none"><MenuDivider /></li>

          <li role="none">
            <MenuLink href="/api/auth/signout" onSelect={close} icon={<Logout size={18} color="var(--accent-red)" className='text-[--accent-red]' />}>
              Cerrar sesión
            </MenuLink>
          </li>
        </ul>
      </Popover>
    </div>
  );
}

/* ───────── Header compacto ───────── */
function MenuHeader({ roleLabel, iconName }:{ roleLabel: string; iconName: 'student'|'teacher' }) {
  const icon =
    iconName === 'student'
      ? <Book size={14} color="var(--brand)" />
      : <Briefcase size={14} color="var(--brand)" />;

  return (
    <div className="px-3.5 pt-3 pb-2">
      <div className="flex items-center gap-2.5 rounded-t-xl border border-[var(--border)]
                      bg-[var(--section)] px-2.5 py-1.5">
        {/* círculo pequeño con el icono dentro */}
        <span className="inline-grid place-items-center h-6 w-6 rounded-full
                         bg-[var(--card)] border border-[var(--border)]">
          {icon}
        </span>
        {/* texto del rol, mismo “tamaño visual” que el icono */}
        <span className="text-[14px] leading-none font-medium text-[var(--fg)]">
          {roleLabel}
        </span>
      </div>
    </div>
  );
}

/* ───────── Items ───────── */
function MenuLink({
  href,
  icon,
  children,
  onSelect,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  return (
    <Link href={href} role="menuitem" onClick={onSelect} className="menu-row">
      <span className="menu-icon">{icon}</span>
      <span className="menu-text">{children}</span>
    </Link>
  );
}

function MenuDivider() {
  return <div className="h-px my-2 bg-[var(--border)]" role="separator" />;
}
