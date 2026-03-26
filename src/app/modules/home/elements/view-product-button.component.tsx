'use client'

import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

const ViewProductsButtonComponent = () => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const { currentUser } = useAuthStore()
  const translations = useTranslations('HomePage')

  const handleClick = () => {
    startTransition(() => {
      router.push(currentUser ? '/products' : '/auth')
    })
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className={`w-30 cursor-pointer sm:w-32 ${isPending ? 'cursor-not-allowed' : ''}`}
    >
      {isPending ? translations('actions.pendingViewProducts') : translations('actions.viewProducts')}
    </Button>
  )
}

export default ViewProductsButtonComponent
