import { type Metadata, type NextPage } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import { AuthModule } from '@/app/modules/auth'
import { type ILocaleParamsProps } from '@/app/shared/interfaces'

// interface
interface IMetadataProps extends ILocaleParamsProps {
  searchParams: Promise<{ tab: string }>
}

interface IProps {}

// metadata
export async function generateMetadata({ params, searchParams }: Readonly<IMetadataProps>): Promise<Metadata> {
  const { tab } = await searchParams
  const { locale } = await params

  const isSignUp = tab === 'signup'

  const translations = await getTranslations({ locale, namespace: 'AuthPage' })

  return {
    title: isSignUp ? translations('heading.signup') : translations('heading.login'),
    description: isSignUp ? translations('description.signup') : translations('description.login'),
  }
}

// component
const Page: NextPage<Readonly<IProps>> = () => {
  //return
  return (
    <Suspense>
      <AuthModule />
    </Suspense>
  )
}

export default Page
