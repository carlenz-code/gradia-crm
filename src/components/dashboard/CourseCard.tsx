'use client'

import { Book, ArrowRight3 } from 'iconsax-react'
import { useRouter } from 'next/navigation'

type CourseCardProps = {
  id: string                       // <-- IMPORTANTE
  thumbnailSrc?: string
  titulo: string
  carrera: string
  estadistica1: string // ej: "30 estudiantes"
  estadistica2: string // ej: "8 pendientes"
  onOpen?: () => void  // opcional, si quieres manejar click afuera
}

export default function CourseCard({
  id,
  thumbnailSrc = '/sessionimage.jpg',
  titulo,
  carrera,
  estadistica1,
  estadistica2,
  onOpen,
}: CourseCardProps) {
  const router = useRouter()
  const go = () => (onOpen ? onOpen() : router.push(`/courses/${id}`))

  return (
    <div className="w-full h-[217px] bg-white border rounded-2xl shadow-sm flex flex-col px-[6px] pt-[6px] pb-3">
      {/* Imagen 260x108 con overlay */}
      <div className="relative w-[260px] h-[108px]">
        <img
          src={thumbnailSrc}
          alt="course"
          className="w-[260px] h-[108px] rounded-xl object-cover"
        />
        <button
          type="button"
          aria-label="Abrir curso"
          onClick={go}
          className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow
                     hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <ArrowRight3 size={18} color="#111827" />
        </button>
      </div>

      <div className="mt-2 px-2">
        {/* Book centrado verticalmente + textos */}
        <div className="flex items-center gap-2">
          <Book size={22} color="#3B82F6" className="shrink-0" />
          <div className="min-w-0">
            <h4 className="text-[14px] font-semibold text-gray-900 truncate">
              {titulo}
            </h4>
            <p className="text-[13px] text-gray-500 truncate">
              Carrera: {carrera}
            </p>
          </div>
        </div>

        {/* Pills */}
        <div className="mt-3 flex items-center gap-2">
          <Pill>{estadistica1}</Pill>
          <Pill>{estadistica2}</Pill>
        </div>
      </div>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-[109px] h-[24px] items-center justify-center rounded-full
                     bg-gray-100 text-[12px] text-gray-700 leading-none whitespace-nowrap">
      {children}
    </span>
  )
}
