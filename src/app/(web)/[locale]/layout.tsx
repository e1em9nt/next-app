import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Header } from '@/app/widgets/header'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
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

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
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
            <Header />
            {children}
          </RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
