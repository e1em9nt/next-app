import { type FC } from 'react'

import { Spinner } from '@/pkg/theme/ui/spinner'

// interface
interface IProps {}

// component
const LoadingModule: FC<Readonly<IProps>> = () => {
  // return
  return (
    <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
      <Spinner className='size-14 md:size-20' />
    </div>
  )
}

export default LoadingModule
