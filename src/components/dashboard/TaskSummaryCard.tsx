import { Document } from 'iconsax-react'

type TaskSummaryCardProps = {
  count: number
  subtitle: string
  iconColor?: string
}

export default function TaskSummaryCard({ count, subtitle, iconColor = '#60A5FA' }: TaskSummaryCardProps) {
  return (
    <div className="w-full rounded-2xl border bg-white p-4 shadow-sm flex items-center gap-3">
      <div className="w-[50px] h-[50px] rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
        <Document size={24} color={iconColor} />
      </div>
      <div className="min-w-0">
        <div className="text-[14px] font-semibold text-gray-900">{count} Nuevos</div>
        <div className="text-[14px] text-gray-500">{subtitle}</div>
      </div>
    </div>
  )
}
