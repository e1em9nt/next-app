'use client'

import { ArrowRightIcon } from 'lucide-react'
import { type FC } from 'react'

import { Link, useRouter } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { Button, buttonVariants } from '@/pkg/theme/ui/button'

import { BUTTON_CLASSNAME } from './card-action.constant'

// interface
interface IProps {
  isCompact: boolean
  href?: string
}

// component
const ProductCardActionComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { isCompact, href = '' } = props

  const router = useRouter()

  // return forward button
  if (isCompact) {
    return (
      <Link href={href} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), BUTTON_CLASSNAME)}>
        <ArrowRightIcon className='size-4 -rotate-45' />
        <span className='sr-only'>Read more</span>
      </Link>
    )
  }

  // return back button
  return (
    <Button variant='outline' size='icon' className={BUTTON_CLASSNAME} onClick={() => router.back()}>
      <ArrowRightIcon className='size-4 -rotate-180' />
      <span className='sr-only'>Go back</span>
    </Button>
  )
}

export default ProductCardActionComponent
