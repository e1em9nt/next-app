import { Link } from '@/pkg/locale'

interface ICardImageContainerProps {
  children: React.ReactNode
  isCompact: boolean
  href?: string
}

const CardImageContainerComponent = ({ children, isCompact, href = '' }: ICardImageContainerProps) => {
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

export default CardImageContainerComponent
