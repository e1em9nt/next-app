import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { type ILocaleParamsProps } from '@/app/shared/interfaces'
import { HeaderComponent } from '@/app/widgets/header'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'

// interface
interface IProps extends ILocaleParamsProps {
  children: ReactNode
}

// metadata
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { locale } = await params

  const translations = await getTranslations({ locale, namespace: 'HomePage' })

  return {
    title: translations('title'),
    description: translations('description'),
  }
}

// static params
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // return
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <RestApiProvider>
            <HeaderComponent />
            {children}
          </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
