'use client'

import { LogIn, User } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useAuthStore } from '@/app/shared/store'
import { Link, usePathname, useRouter } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { Button, buttonVariants } from '@/pkg/theme/ui/button'

const HeaderAuthButtonsComponent = () => {
  const pathname = usePathname()
  const { currentUser, logout, _hasHydrated } = useAuthStore()
  const router = useRouter()
  const translations = useTranslations('Header.auth')

  const isRootPage = pathname === '/' || pathname.match(/^\/[a-z]{2}\/?$/)
  const isProductPage = pathname.includes('/products')

  function handleLogout() {
    logout()
    router.push('/')
  }

  if (!_hasHydrated) return null

  if ((isProductPage && currentUser) || (isRootPage && currentUser)) {
    return (
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2 text-sm'>
          <User className='size-4' />
          <span>{currentUser.name}</span>
        </div>
        <Button variant='outline' onClick={handleLogout} className='px-4'>
          {translations('logout')}
        </Button>
      </div>
    )
  }

  if (isRootPage && !currentUser) {
    return (
      <div className='flex items-center gap-3'>
        <Link href='/auth?tab=signup' className={cn(buttonVariants({ variant: 'outline' }), 'w-22 border sm:w-28')}>
          <LogIn /> {translations('signup')}
        </Link>
        <Link href='/auth' className={cn(buttonVariants({ variant: 'default' }), 'w-22 sm:w-28')}>
          <User /> {translations('login')}
        </Link>
      </div>
    )
  }

  return null
}

export default HeaderAuthButtonsComponent
