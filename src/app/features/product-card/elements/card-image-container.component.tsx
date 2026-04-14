import { type FC, type ReactNode } from 'react'

import { Link } from '@/pkg/locale'

// interface
interface IProps {
  children: ReactNode
  isCompact: boolean
  href?: string
}

// component
const CardImageContainerComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { children, isCompact, href = '' } = props

  const className = 'relative mb-6 overflow-hidden rounded-lg'

  if (isCompact) {
    // return link as image container
    return (
      <Link href={href} className={`${className} block`}>
        {children}
      </Link>
    )
  }

  // return div as image container
  return <div className={className}>{children}</div>
}

export default CardImageContainerComponent
