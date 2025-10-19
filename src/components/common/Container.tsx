// src/components/common/Container.tsx
type Props = { className?: string; children: React.ReactNode }

export default function Container({ className = "", children }: Props) {
  return (
    <div className={`mx-auto max-w-[1400px] px-4 md:px-8 xl:px-[80px] ${className}`}>
      {children}
    </div>
  );
}
