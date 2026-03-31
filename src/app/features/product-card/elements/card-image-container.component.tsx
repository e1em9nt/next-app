import { type FC, type ReactNode } from 'react'

import { Link } from '@/pkg/locale'

// interface
interface IProps {
  children: ReactNode
  isCompact: boolean
  href?: string
}

// component
const CardImageContainerComponent: FC<Readonly<IProps>> = (props) => {
  const { children, isCompact, href = '' } = props

  const className = 'mb-6 overflow-hidden rounded-lg sm:mb-12'

  if (isCompact) {
    // return link as image container
    return (
      <Link href={href} className={`${className} block`}>
        {children}
      </Link>
    )
  } else {
    // return div as image container
    return <div className={className}>{children}</div>
  }
}

export default CardImageContainerComponent
