import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/pkg/libraries/locale';

import { QueryProvider } from '@/app/shared/ui';
import { Header } from '@/app/widgets/header';
import '@/config/styles/globals.css';
import { getTranslations } from 'next-intl/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translations = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: translations('title'),
    description: translations('description'),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
