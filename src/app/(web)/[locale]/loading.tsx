import { type NextPage } from 'next'

import { Spinner } from '@/pkg/theme/ui/spinner'

// component
const Loading: NextPage = () => {
  // return
  return (
    <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
      <Spinner className='size-14 md:size-20' />
    </div>
  )
}

export default Loading
