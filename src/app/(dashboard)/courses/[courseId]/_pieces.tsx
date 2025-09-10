'use client'

import { useState } from 'react'
import type { Unit } from '@/lib/courses'
import { ArrowDown2 } from 'iconsax-react'

export function UnitAccordion({ unit }: { unit: Unit }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border rounded-2xl bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <span className="font-medium">{unit.title}</span>
        <ArrowDown2
          size={16}
          className={`transition ${open ? 'rotate-180' : ''}`}
          color="#6B7280"
        />
      </button>

      {open && (
        <div className="px-4 pb-3">
          <ul className="space-y-1">
            {unit.lessons.map(l => (
              <li key={l.id} className="text-sm text-gray-600 flex items-center justify-between">
                <span className="truncate">{l.title}</span>
                {l.minutes ? <span className="text-gray-400">{l.minutes} min</span> : null}
              </li>
            ))}
          </ul>

          {unit.tasks.length > 0 && (
            <>
              <div className="h-px bg-gray-200 my-3" />
              <div className="text-sm text-gray-500">Tareas de la unidad:</div>
              <ul className="list-disc list-inside text-sm">
                {unit.tasks.map(t => <li key={t.id}>{t.title}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export function MaterialRow({
  title, type, url,
}: { title: string; type: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-xl border bg-white px-4 py-2 hover:bg-gray-50"
    >
      <span className="text-sm text-gray-800 truncate">{title}</span>
      <span className="text-xs text-gray-400 uppercase">{type}</span>
    </a>
  )
}
