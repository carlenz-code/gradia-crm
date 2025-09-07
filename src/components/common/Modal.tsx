"use client";
import { ReactNode, useEffect } from "react";
import { FiX } from "react-icons/fi";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  widthClass?: string; 
};

export default function Modal({ open, onClose, title, children, widthClass = "max-w-xl" }: Props) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* dialog */}
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className={`w-full ${widthClass} rounded-2xl bg-white shadow-xl`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100"
              aria-label="Cerrar modal"
            >
              <FiX />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
