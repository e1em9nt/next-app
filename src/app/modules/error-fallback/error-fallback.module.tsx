import { type FC } from 'react'

import { type IErrorProps } from '@/app/shared/interfaces'
import { cn } from '@/pkg/theme/lib/utils'
import { Button, buttonVariants } from '@/pkg/theme/ui/button'

// component
const ErrorFallbackModule: FC<Readonly<IErrorProps>> = (props) => {
  const { reset, error } = props

  // return
  return (
    <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-8 text-center'>
      <h2 className='mb-6 text-5xl font-semibold'>{error?.message || 'Something went wrong!'}</h2>

      <div className='flex gap-4'>
        {reset && (
          <Button variant='default' className='w-28' onClick={reset}>
            Try again
          </Button>
        )}

        <button
          className={cn(buttonVariants({ variant: 'outline' }), 'border-border w-28')}
          onClick={() => (window.location.href = '/')}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}

export default ErrorFallbackModule
