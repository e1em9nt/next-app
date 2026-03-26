import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/pkg/theme/ui/card'

import { LoginForm } from './login-form.component'
import { SignupForm } from './signup-form.component'

type TAuthCardVariant = 'login' | 'signup'

interface IAuthCardProps {
  variant: TAuthCardVariant
}

export const AuthCard = ({ variant }: IAuthCardProps) => {
  const translations = useTranslations('AuthPage.heading')

  return (
    <Card className='border-none py-6 pb-9 shadow-lg sm:max-w-lg sm:px-5'>
      <CardHeader className='gap-6'>
        <CardTitle className='mb-1.5 text-center text-xl sm:text-2xl'>
          {variant === 'login' ? translations('login') : translations('signup')}
        </CardTitle>
      </CardHeader>
      <CardContent>{variant === 'login' ? <LoginForm /> : <SignupForm />}</CardContent>
    </Card>
  )
}
