import { ElementType, type FC, type ReactNode } from 'react'

// interface
interface IProps {
  icon: ElementType
  children: ReactNode
}

// component
const ExpandedCardListItemComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { icon: Icon, children } = props

  // return
  return (
    <li>
      <span className='mr-2'>
        <Icon className='text-foreground inline-block size-4' />
      </span>
      {children}
    </li>
  )
}

export default ExpandedCardListItemComponent
