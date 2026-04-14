'use client'

import { LogIn, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { useAuthStore } from '@/app/shared/store'
import { Link, usePathname, useRouter } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { Button, buttonVariants } from '@/pkg/theme/ui/button'

// interface
interface IProps {}

// component
const HeaderAuthButtonsComponent: FC<Readonly<IProps>> = () => {
  const pathname = usePathname()
  const router = useRouter()

  const currentUser = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout)
  const hasHydrated = useAuthStore((state) => state._hasHydrated)

  const translations = useTranslations('Header.auth')

  const isRootPage = pathname === '/' || pathname.match(/^\/[a-z]{2}\/?$/)
  const isProductPage = pathname.includes('/products')

  function handleLogout() {
    logout()
    router.push('/')
  }

  // return for login/signup button flickering prevention
  if (!hasHydrated) return null

  // return for authenticated user
  if ((isProductPage && currentUser) || (isRootPage && currentUser)) {
    return (
      <div className='flex items-center gap-5'>
        <div className='hidden items-center gap-2 text-sm sm:flex'>
          <User className='size-4' />

          <span>{currentUser.name}</span>
        </div>

        <Button variant='outline' onClick={handleLogout} className='cursor-pointer px-4'>
          {translations('logout')}
        </Button>
      </div>
    )
  }

  // return in public page for unauthenticated user
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

  // return in protected pages for unauthenticated user
  return null
}

export default HeaderAuthButtonsComponent
