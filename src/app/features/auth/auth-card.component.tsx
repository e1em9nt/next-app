import { Card, CardHeader, CardTitle, CardContent } from '@/app/shared/ui/card';
import { LoginForm } from './login-form.component';
import { SignupForm } from './signup-form.component';
import { AuthCardProps } from './auth-card.interface';

export const AuthCard = ({ variant }: AuthCardProps) => {
  return (
    <Card className="sm:px-5 py-6 pb-9 border-none shadow-lg sm:max-w-lg">
      <CardHeader className="gap-6">
        <CardTitle className="mb-1.5 text-xl sm:text-2xl text-center">
          {variant === 'login' ? 'Log in' : 'Sign up'}
        </CardTitle>
      </CardHeader>
      <CardContent>{variant === 'login' ? <LoginForm /> : <SignupForm />}</CardContent>
    </Card>
  );
};
