import { Card, CardHeader, CardTitle, CardContent } from '@/pkg/theme/ui/card';
import { LoginForm } from './login-form.component';
import { SignupForm } from './signup-form.component';
import { useTranslations } from 'next-intl';

type AuthCardVariant = 'login' | 'signup';

interface AuthCardProps {
  variant: AuthCardVariant;
}

export const AuthCard = ({ variant }: AuthCardProps) => {
  const translations = useTranslations('AuthPage.heading');

  return (
    <Card className="sm:px-5 py-6 pb-9 border-none shadow-lg sm:max-w-lg">
      <CardHeader className="gap-6">
        <CardTitle className="mb-1.5 text-xl sm:text-2xl text-center">
          {variant === 'login' ? translations('login') : translations('signup')}
        </CardTitle>
      </CardHeader>
      <CardContent>{variant === 'login' ? <LoginForm /> : <SignupForm />}</CardContent>
    </Card>
  );
};
