'use client';
import { motion, AnimatePresence } from '@/lib/utils/motion';
import StudentGeneralTab from '@/components/Tabs/StudentGeneralTab';
import TeacherGeneralTab from '@/components/Tabs/TeacherGeneralTab';
import VistaAmpliadaTab from '@/components/Tabs/VistaAmpliada/VistaAmpliadaTab';
import type { MinimalUser } from '@/lib/types';

type Props = { tab: 'general' | 'vista'; user: MinimalUser };

export default function TabAnimator({ tab, user }: Props) {
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab === 'general' ? `general-${user.role}` : 'vista'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {tab === 'general'
            ? (user.role === 'TEACHER'
                ? <TeacherGeneralTab user={user} />
                : <StudentGeneralTab user={user} />)
            : <VistaAmpliadaTab /> /* 👈 sin props */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
