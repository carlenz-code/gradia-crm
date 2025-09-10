'use client';

import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import GeneralTab from '@/components/Tabs/GeneralTab';
import OtroTab from '@/components/Tabs/OtroTab';
import { getCurrentUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import type { MinimalUser } from '@/lib/types';

export default function DashboardHome() {
  const [user, setUser] = useState<MinimalUser | null>(null);

  // traer el usuario en client (para evitar async server conflict)
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const sp = useSearchParams();
  const rawTab = sp.get('tab');
  const tab: 'general' | 'otro' = rawTab === 'otro' ? 'otro' : 'general';

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {tab === 'general' && (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <GeneralTab user={user} />
          </motion.div>
        )}

        {tab === 'otro' && (
          <motion.div
            key="otro"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <OtroTab />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
