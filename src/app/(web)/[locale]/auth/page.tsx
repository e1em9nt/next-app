import { AuthPage } from '@/app/modules/auth-page';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = await searchParams;
  const { locale } = await params;
  //const translations = await getTranslations({ locale, namespace: 'AuthPage' });
  const isSignUp = tab === 'signup';
  const translations = await getTranslations({ locale, namespace: 'AuthPage' });

  return {
    //title: translations('title'),
    //description: translations('description'),
    title: isSignUp ? translations('heading.signup') : translations('heading.login'),
    description: isSignUp ? translations('description.signup') : translations('description.login'),
  };
}

export default function Auth() {
  return <AuthPage />;
}
