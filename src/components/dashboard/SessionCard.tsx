import { Book, ArrowRight3 } from 'iconsax-react'

type SessionCardProps = {
  thumbnailSrc?: string
  carrera: string
  titulo: string
  enlaceHref: string
  enlaceTexto?: string
  fecha: string
  onContinuar?: () => void
}

export default function SessionCard({
  
  carrera,
  titulo,
  enlaceHref,
  enlaceTexto,
  fecha,
  onContinuar,
}: SessionCardProps) {
  return (
    <div className="w-full h-[89px] bg-white border border-gray-300 rounded-2xl px-2 py-2">
      {/* IMG | Info | Enlace | Fecha | Botón */}
      <div className="grid grid-cols-[115px_minmax(0,1fr)_160px_110px_120px] items-center gap-4 h-full">
        {/* Imagen */}
       <img src="/sessionimage.jpg" alt="class" width={105} height={74} className="rounded-xl object-cover" />

        {/* Info */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 text-[14px] text-gray-500">
            <Book size={20} color="#3B82F6" />
            <span className="truncate">{carrera}</span>
          </div>
          <div className="mt-2 text-[14px] font-medium text-gray-900 truncate">
            {titulo}
          </div>
        </div>

        {/* Enlace */}
        <div className="min-w-0">
          <div className="text-[12px] text-gray-400 leading-none mb-3.5">Enlace</div>
          <a
            href={enlaceHref}
            target="_blank"
            rel="noreferrer"
            className="block max-w-full truncate text-[14px] text-blue-600 hover:underline"
          >
            {enlaceTexto ?? enlaceHref}
          </a>
        </div>

        {/* Fecha */}
        <div className="text-right">
          <div className="text-[12px] text-gray-400 leading-none mb-2.5">Fecha</div>
          <div className="text-[14px] font-medium text-fuchsia-600">{fecha}</div>
        </div>

        {/* Botón redondo */}
        <div className="justify-self-end mr-12">
          <button
            type="button"
            aria-label="Abrir sesión"
            onClick={onContinuar}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 bg-white
                       hover:bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
          >
            <ArrowRight3 size={20} color="#111827" />
          </button>
        </div>
      </div>
    </div>
  )
}
