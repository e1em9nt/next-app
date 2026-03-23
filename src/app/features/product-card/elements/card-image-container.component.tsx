import { Link } from '@/pkg/locale'

interface CardImageContainerProps {
  children: React.ReactNode
  isCompact: boolean
  href?: string
}

export const CardImageContainer = ({ children, isCompact, href = '' }: CardImageContainerProps) => {
  const className = 'mb-6 overflow-hidden rounded-lg sm:mb-12'
  if (isCompact) {
    return (
      <Link href={href} className={`${className} block`}>
        {children}
      </Link>
    )
  } else {
    return <div className={className}>{children}</div>
  }
}
