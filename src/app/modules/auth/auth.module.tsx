'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import authBackground from '@/app/shared/assets/icon/main-bg.png'
import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/pkg/theme/ui/tabs'

import { AuthCardComponent } from './elements'

function AuthModule() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'login'
  const translations = useTranslations('AuthPage.heading')
  const { currentUser, _hasHydrated } = useAuthStore()

  useEffect(() => {
    if (_hasHydrated && currentUser) {
      router.replace('/products')
    }
  }, [currentUser, _hasHydrated, router])

  const handleTabChange = (value: string) => {
    router.replace(value === 'login' ? '/auth' : '/auth?tab=signup')
  }

  if (!_hasHydrated || currentUser) return null

  return (
    <main className='relative min-h-[calc(100vh-64px)] px-2.5 py-8 sm:px-5'>
      <Image
        src={authBackground}
        alt='Auth Background'
        fill
        priority
        placeholder='blur'
        className='-z-10 object-cover'
      />
      <Tabs defaultValue={tab} onValueChange={handleTabChange} className='mx-auto flex w-full max-w-md flex-col gap-8'>
        <TabsList className='space-x-4 self-center'>
          <TabsTrigger value='login' className='w-22 cursor-pointer sm:w-30'>
            {translations('login')}
          </TabsTrigger>
          <TabsTrigger value='signup' className='w-22 cursor-pointer sm:w-30'>
            {translations('signup')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <AuthCardComponent variant='login' />
        </TabsContent>
        <TabsContent value='signup'>
          <AuthCardComponent variant='signup' />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default AuthModule
