import { type ReactNode } from 'react'

import { Link } from '@/pkg/locale'

interface ICardImageContainerProps {
  children: ReactNode
  isCompact: boolean
  href?: string
}

const CardImageContainerComponent = (props: ICardImageContainerProps) => {
  const { children, isCompact, href = '' } = props

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
