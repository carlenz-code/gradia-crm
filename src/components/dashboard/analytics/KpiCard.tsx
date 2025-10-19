'use client';
import { motion } from '@/lib/utils/motion';

export default function KpiCard({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
      <div className="text-[12px] text-[color:var(--muted)]">{label}</div>
      <div className="mt-1 text-2xl font-semibold">
        {value}{suffix && <span className="text-base ml-1">{suffix}</span>}
      </div>
    </motion.div>
  );
}
