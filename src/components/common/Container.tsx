// src/components/common/Container.tsx
type Props = {
  className?: string;
  children: React.ReactNode;
  /** default = como ahora, wide = más ancho en pantallas grandes, full = casi sin límites */
  size?: 'default' | 'wide' | 'full';
};

const PRESET = {
  default: {
    // ~antes: 1400px. Ahora 96vw limitado a 1360–1440 aprox.
    max: 'min(96vw, 1440px)',
    gutter: 'clamp(16px, 4vw, 32px)',
  },
  wide: {
    // Para laptops 15–17" y monitores 2K: respira más
    max: 'min(96vw, 1680px)',
    gutter: 'clamp(16px, 3vw, 18px)',
  },
  full: {
    // Para vistas que quieres casi a borde pero con un poco de aire
    max: 'min(98vw, 1920px)',
    gutter: 'clamp(12px, 2.5vw, 24px)',
  },
};

export default function Container({ className = '', children, size = 'wide' }: Props) {
  const p = PRESET[size];
  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{
        maxWidth: p.max,
        paddingInline: p.gutter,
      }}
    >
      {children}
    </div>
  );
}
