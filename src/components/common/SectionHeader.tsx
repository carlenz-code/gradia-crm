import { InfoCircle } from 'iconsax-react'

type SectionHeaderProps = {
  title: string
  href?: string           // si lo pasas, se renderiza <a>
  onClickRight?: () => void
  rightText?: string
  showInfoIcon?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  href,
  onClickRight,
  rightText = 'Ver todo',
  showInfoIcon = true,
  className,
}: SectionHeaderProps) {
  const Right: any = href ? 'a' : 'button'
  const classes = 'flex items-center justify-between mb-2' + (className ? ` ${className}` : '')

  return (
    <div className={classes}>
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-medium text-gray-700">{title}</span>
        {showInfoIcon && <InfoCircle size={16} color="#F59E0B" />}
      </div>

      <Right
        {...(href ? { href } : { onClick: onClickRight })}
        className="text-[14px] text-blue-600 underline underline-offset-2 decoration-blue-400 hover:opacity-80"
      >
        {rightText}
      </Right>
    </div>
  )
}
