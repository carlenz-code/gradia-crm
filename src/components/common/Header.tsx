"use client";
import { Bell, Gift, MessageCircle, Menu } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 bg-teal-500 text-white flex items-center justify-between px-4 md:px-6 shadow">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="Abrir menú">
          <Menu size={22} />
        </button>
        <div className="font-extrabold tracking-wide text-lg">GRAD<span className="text-teal-100">ia</span></div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {[MessageCircle, Gift, Bell].map((Icon, i) => (
          <button key={i} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            <Icon size={18} />
          </button>
        ))}
        <div className="hidden sm:flex items-center gap-3 bg-white/10 rounded-full pl-3 pr-2 py-1">
          <div className="text-right leading-tight">
            <div className="text-sm font-semibold">Carla Nicolle Esquivel Lévano</div>
            <div className="text-xs opacity-90">Universidad Peruana Unión</div>
          </div>
          <div className="relative w-9 h-9">
            <Image src="/avatar.jpg" alt="Avatar" fill className="rounded-full ring-2 ring-white/50 object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
