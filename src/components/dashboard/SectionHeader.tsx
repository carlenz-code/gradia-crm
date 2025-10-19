import Link from 'next/link';
import { InfoCircle } from 'iconsax-react';

type SectionHeaderProps = {
  title: string;
  href?: string;           // si lo pasas, se renderiza Link
  onClickRight?: () => void;
  rightText?: string;
  showInfoIcon?: boolean;
  className?: string;
};

export default function SectionHeader({
  title,
  href,
  onClickRight,
  rightText = 'Ver todo',
  showInfoIcon = true,
  className,
}: SectionHeaderProps) {
  const classes = 'flex items-center justify-between mb-2' + (className ? ` ${className}` : '');

  const Right = href
    ? (props: any) => <Link {...props} href={href!} />
    : (props: any) => <button {...props} onClick={onClickRight} />;

  return (
    <div className={classes}>
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-medium text-[var(--fg)]">{title}</span>
        {showInfoIcon && <InfoCircle size={16} color="var(--accent-amber)" />}
      </div>

      <Right
        className="text-[14px] underline underline-offset-2 hover:opacity-80
                   text-[color:var(--link)] decoration-[color:var(--link-hover)]"
      >
        {rightText}
      </Right>
    </div>
  );
}
