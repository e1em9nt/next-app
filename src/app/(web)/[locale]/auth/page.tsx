import { type Metadata, type NextPage } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { AuthModule } from '@/app/modules/auth'
import { type ILocaleParamsProps } from '@/app/shared/interfaces'

// interface
interface IProps extends ILocaleParamsProps {
  searchParams: Promise<{ tab?: string }>
}

// metadata
export async function generateMetadata({ params, searchParams }: Readonly<IProps>): Promise<Metadata> {
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
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params, searchParams } = props
  const { locale } = await params
  const { tab } = await searchParams

  setRequestLocale(locale)

  //return
  return <AuthModule tab={tab} />
}

export default Page
