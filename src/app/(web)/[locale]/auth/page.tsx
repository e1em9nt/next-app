import { AuthPage } from '@/app/modules/auth-page';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = await searchParams;
  //const translations = await getTranslations({ locale, namespace: 'AuthPage' });
  const isSignUp = tab === 'signup';

  return {
    //title: translations('title'),
    //description: translations('description'),
    title: isSignUp ? 'Sign up' : 'Log in',
    description: isSignUp
      ? 'Create an account to get started'
      : 'Log in to your account to continue',
  };
}

export default function Auth() {
  return <AuthPage />;
}
