'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { Information, MessageText1, Category2, Notification, SidebarRight } from 'iconsax-react';
import { motion } from 'framer-motion';
import Popover from '@/components/ui/Propover';
import { hoverFade, tapScale } from '@/lib/animations';
import type { MinimalUser } from '@/lib/types';

type Props = { user: MinimalUser; onToggleSidebar?: () => void; };

export default function Header({ user, onToggleSidebar }: Props) {
  const [open, setOpen] = useState(false);
  const isTeacher = user.role === 'TEACHER';
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8 xl:px-[120px]">

        {/* Left: botón sidebar + brand */}
        <div className="flex items-center gap-3">
          <motion.button
            {...tapScale}
            onClick={onToggleSidebar}
            aria-label="Abrir menú lateral"
            title="Abrir menú lateral"
            className="inline-grid h-9 w-9 place-items-center rounded-md hover:bg-gray-50 transition"
          >
            <SidebarRight size="24" color="#000000"/>
          </motion.button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-[24px] font-medium tracking-tight text-indigo-700">Grad.IA</span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Iconos sin borde con micro-interacción */}
          <div className="flex items-center gap-4">
            <MotionIconLink href="/settings" label="Ajustes">
              <Information size="24" color="#000000"/>
            </MotionIconLink>
            <MotionIconLink href="/messages" label="Mensajes">
              <MessageText1 size="24" color="#000000"/>
            </MotionIconLink>
            <MotionIconBtn onClick={() => {}} label="Apps">
              <Category2 size="24" color="#6C4CFF" />
            </MotionIconBtn>
            <MotionIconBtn onClick={() => {}} label="Notificaciones">
              <Notification size="24" color="#000000"/>
            </MotionIconBtn>
          </div>

          {/* Usuario */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={toggle}
              aria-haspopup="menu"
              aria-expanded={open}
              className="flex items-center gap-2"
            >
              <Avatar src={user.avatarUrl ?? undefined} name={user.name} />
              <div className="hidden sm:block text-left">
                <div className="text-[14px] font-medium text-black">{user.name}</div>
                <div className="text-[12px] text-gray-500">{user.org ?? ''}</div>
              </div>
            </button>

            {/* Menú animado */}
            <Popover isOpen={open} onClose={close} align="right" text-color="black">
              <MenuItem href="/profile">Perfil</MenuItem>
              {isTeacher && <MenuItem href="/reviews">Entregas por revisar</MenuItem>}
              {!isTeacher && <MenuItem href="/submissions">Mis entregas</MenuItem>}
              <div className="h-px bg-gray-100 "/>
              <MenuItem href="/api/auth/signout">Cerrar sesión</MenuItem>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Helpers animados para iconos */

function MotionIconLink({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <motion.a
      href={href}
      title={label}
      aria-label={label}
      {...hoverFade}
      {...tapScale}
      className="block"
    >
      {children}
    </motion.a>
  );
}

function MotionIconBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      title={label}
      aria-label={label}
      {...hoverFade}
      {...tapScale}
    >
      {children}
    </motion.button>
  );
}

/* Resto igual que ya tienes */

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="block px-4 py-2 text-sm hover:bg-gray-50 text-black" >{children}</Link>;
}

function Avatar({ src, name }: { src?: string; name: string }) {
  const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  return src ? (
    <Image src={src} alt={name} width={36} height={36} className="rounded-full object-cover" />
  ) : (
    <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-indigo-500 text-white text-sm">
      {initials}
    </span>
  );
}
