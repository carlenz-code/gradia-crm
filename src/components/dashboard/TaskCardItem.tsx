import { Clock } from 'iconsax-react'

type TaskCardProps = {
  titulo: string
  descripcion: string
  fecha: string
  href?: string
}

export default function TaskCard({ titulo, descripcion, fecha, href }: TaskCardProps) {
  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* Top */}
      <div className="p-4 rounded-2xl">
        {href ? (
          <a href={href} className="block text-[14px] font-semibold text-purple-700 hover:underline truncate" title={titulo}>
            {titulo}
          </a>
        ) : (
          <div className="text-[14px] font-semibold text-purple-700 truncate" title={titulo}>
            {titulo}
          </div>
        )}
        <div className="mt-3 h-px bg-gray-200" />
        <p className="mt-3 text-[14px] leading-snug text-gray-500">{descripcion}</p>
      </div>

      {/* Footer (pegado) */}
      <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 text-[14px] text-fuchsia-600">
        <Clock size={18} color="#A855F7" />
        <span className="truncate">{fecha}</span>
      </div>
    </div>
  )
}
