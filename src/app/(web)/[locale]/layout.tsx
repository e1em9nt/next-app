import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { type ReactNode } from 'react'

import { type ILocaleParamsProps } from '@/app/shared/interfaces'
import { HeaderComponent } from '@/app/widgets/header'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'

interface ILocaleLayoutProps extends ILocaleParamsProps {
  children: ReactNode
}

export async function generateMetadata({ params }: ILocaleParamsProps) {
  const { locale } = await params
  const translations = await getTranslations({ locale, namespace: 'HomePage' })

  return {
    title: translations('title'),
    description: translations('description'),
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

async function LocaleLayout(props: Readonly<ILocaleLayoutProps>) {
  const { children, params } = props

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

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
