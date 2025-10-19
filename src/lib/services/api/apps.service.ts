import { Book, DocumentText, Video, Calendar, Messages2, Chart, Profile, Setting2 } from 'iconsax-react';
import type { ComponentType } from 'react';

type AppItem = { href: string; label: string; Icon: ComponentType<{ size?: number; color?: string }> };

export const apps: AppItem[] = [
  { href: '/courses',   label: 'Cursos',     Icon: Book },
  { href: '/tasks',     label: 'Tareas',     Icon: DocumentText },
  { href: '/sessions',  label: 'Sesiones',   Icon: Video },
  { href: '/calendar',  label: 'Calendario', Icon: Calendar },
  { href: '/messages',  label: 'Mensajes',   Icon: Messages2 },
  { href: '/analytics', label: 'Analítica',  Icon: Chart },
  { href: '/profile',   label: 'Perfil',     Icon: Profile },
  { href: '/settings',  label: 'Ajustes',    Icon: Setting2 },
];
