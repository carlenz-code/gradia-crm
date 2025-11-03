'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Information, SidebarRight } from 'iconsax-react';
import Container from '@/components/common/Container';
import SubHeaderTabs from '@/components/common/Header/SubHeaderTabs';
import UserMenu from '@/components/common/Header/UserMenu/UserMenu';
import type { MinimalUser } from '@/lib/types';
import { AppsMenu } from './Menus/AppsMenu';
import { MessagesMenu } from './Menus/MessagesMenu';
import { NotificationsMenu } from './Menus/NotificationsMenu';

type TabItem = { value: string; label: string; icon?: React.ReactNode; disabled?: boolean };
type Props = { user: MinimalUser; tabs?: TabItem[]; onToggleSidebar?: () => void };

export default function Header({ user, tabs = [], onToggleSidebar }: Props) {
  return (
    <header
      className="
    sticky top-0 z-50
    border-b border-[var(--border)]
    bg-[var(--card)]/90 dark:bg-[var(--section)]/80
    backdrop-blur
    overflow-visible
  "
      style={{ transform: 'none' }}
    >

      <div className="overflow-visible" style={{ transform: 'none' }}>
        <Container size="wide" className="flex h-14 md:h-16 items-center justify-between gap-4 overflow-visible">
          {/* IZQ */}
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            <motion.button
              type="button"
              onClick={() => onToggleSidebar?.()}
              aria-label="Abrir menú lateral"
              className="inline-grid h-9 w-9 place-items-center rounded-md transition shrink-0 hover:bg-[var(--section)]"
            >
              <SidebarRight size={24} color="var(--icon)" variant="Outline" />
            </motion.button>

            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-[22px] md:text-[24px] font-medium tracking-tight text-[var(--brand)]">Grad.IA</span>
            </Link>

            {tabs.length > 0 && (
              <div className="ml-3 md:ml-4 hidden md:block min-w-0 max-w-full">
                <SubHeaderTabs items={tabs} inline />
              </div>
            )}
          </div>

          {/* DER */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="hidden md:flex items-center gap-4">
              <Link href="/settings" aria-label="Ajustes" className="block">
                <Information size={24} color="var(--icon)" variant="Outline" />
              </Link>
              <MessagesMenu />
              <AppsMenu />
              <NotificationsMenu />
            </div>
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
    </header>
  );
}
