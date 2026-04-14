'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import authBackground from '@/app/shared/assets/icon/main-bg.png'
import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/pkg/theme/ui/tabs'

import { AuthCardComponent } from './elements'

// interface
interface IProps {
  tab?: string
}

// component
const AuthModule: FC<Readonly<IProps>> = (props: IProps) => {
  const { tab = 'login' } = props

  const router = useRouter()

  const currentUser = useAuthStore((state) => state.currentUser)
  const hasHydrated = useAuthStore((state) => state._hasHydrated)

  const translations = useTranslations('AuthPage.heading')

  // handler
  const handleTabChange = (value: string) => {
    router.replace(value === 'login' ? '/auth' : '/auth?tab=signup')
  }

  // return for flicker prevention
  if (!hasHydrated || currentUser) return null

  // return
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
