// eslint-disable-next-line no-restricted-imports
import Link from 'next/link'

import { cn } from '@/pkg/theme/lib/utils'
import { Button, buttonVariants } from '@/pkg/theme/ui/button'

interface IErrorFallbackProps {
  reset?: () => void
}

function ErrorFallbackModule({ reset }: IErrorFallbackProps) {
  return (
    <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-8 text-center'>
      <h2 className='mb-6 text-5xl font-semibold'>Something went wrong!</h2>
      <div className='flex gap-4'>
        {reset && (
          <Button variant='default' className='w-28' onClick={reset}>
            Try again
          </Button>
        )}
        <Link href='/' className={cn(buttonVariants({ variant: 'outline' }), 'border-border w-28')}>
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default ErrorFallbackModule
