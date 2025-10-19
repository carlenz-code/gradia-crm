'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { GradePoint } from '@/lib/types/dashboard.types';

export default function GradeTrendChart({ data }: { data: GradePoint[] }) {
  const mapped = data.map(d => ({ ...d, label: new Date(d.date).toLocaleDateString('es-PE') }));
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 h-[260px]">
      <div className="px-1 pb-2 text-[13px] font-medium">Evolución de notas</div>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={mapped}>
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 20]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="var(--brand)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
