import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { AuthModule } from '@/app/modules/auth'
import { type ILocaleParamsProps } from '@/app/shared/interfaces'

interface IAuthMetadataProps extends ILocaleParamsProps {
  searchParams: Promise<{ tab: string }>
}

export async function generateMetadata({ params, searchParams }: Readonly<IAuthMetadataProps>) {
  const { tab } = await searchParams
  const { locale } = await params

  const isSignUp = tab === 'signup'

  const translations = await getTranslations({ locale, namespace: 'AuthPage' })

  return {
    title: isSignUp ? translations('heading.signup') : translations('heading.login'),
    description: isSignUp ? translations('description.signup') : translations('description.login'),
  }
}

function Auth() {
  return (
    <Suspense>
      <AuthModule />
    </Suspense>
  )
}

export default Auth
