'use client';

import { useEffect, useRef, useState } from 'react';
import { CloseCircle, TickCircle, DocumentDownload } from 'iconsax-react';

type ResourceType = 'pdf' | 'document' | 'notebook' | 'slide' | 'link' | 'video';

export default function AddResourceModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (r: { title: string; type: ResourceType; url: string; size?: string }) => void;
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ResourceType>('document');
  const [url, setUrl] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      setTitle('');
      setType('document');
      setUrl('');
      if (fileRef.current) fileRef.current.value = '';
    }
  }, [open]);

  if (!open) return null;

  const onFilePicked = async (f: File) => {
    if (!f) return;
    // Intentar convertir a dataURL (persiste); si falla, usar blob URL (no persiste).
    const toDataUrl = () =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('reader'));
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(f);
      });

    let finalUrl = '';
    try {
      // dataURL puede ser pesado; considera tu backend en prod.
      finalUrl = await toDataUrl();
    } catch {
      finalUrl = URL.createObjectURL(f);
    }
    setUrl(finalUrl);
    if (!title) setTitle(f.name);
    if (f.type.includes('pdf')) setType('pdf');
    if (f.type.includes('video')) setType('video');
  };

  const submit = () => {
    if (!title.trim() || !url.trim()) return;
    onSubmit({ title: title.trim(), type, url, size: fileRef.current?.files?.[0] ? fmt(fileRef.current.files[0].size) : undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[min(520px,92vw)] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold">Agregar recurso</h3>
          <button className="icon-btn" onClick={onClose}><CloseCircle size={18} color="var(--icon)" /></button>
        </div>

        <div className="mt-4 grid gap-3">
          <label className="text-[13px]">
            Título
            <input
              className="mt-1 w-full h-10 rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 text-[14px]"
              value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre del recurso…"
            />
          </label>

          <label className="text-[13px]">
            Tipo
            <select
              className="mt-1 w-full h-10 rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 text-[14px]"
              value={type} onChange={(e) => setType(e.target.value as ResourceType)}
            >
              <option value="document">Documento</option>
              <option value="pdf">PDF</option>
              <option value="slide">Presentación</option>
              <option value="notebook">Notebook</option>
              <option value="video">Video</option>
              <option value="link">Enlace</option>
            </select>
          </label>

          <div className="grid gap-2">
            <span className="text-[13px]">URL o archivo</span>
            <input
              className="w-full h-10 rounded-xl border border-[var(--border)] bg-[var(--section)] px-3 text-[14px]"
              placeholder="https://… (opcional si adjuntas archivo)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                onChange={(e) => e.target.files?.[0] && onFilePicked(e.target.files[0])}
                className="hidden" id="filePick"
              />
              <label
                htmlFor="filePick"
                className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] text-[13px] hover:bg-[var(--section)] cursor-pointer"
              >
                <DocumentDownload size={18} color="var(--icon)" />
                Adjuntar archivo
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="h-9 px-3 rounded-xl border border-[var(--border)]" onClick={onClose}>Cancelar</button>
          <button className="h-9 px-3 inline-flex items-center gap-2 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 text-[var(--brand)]" onClick={submit}>
            <TickCircle size={18} color="var(--brand)" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function fmt(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}
