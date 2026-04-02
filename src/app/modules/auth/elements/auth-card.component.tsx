import { useTranslations } from 'next-intl'
import { type FC } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/pkg/theme/ui/card'

import LoginFormComponent from './login-form.component'
import SignupFormComponent from './signup-form.component'

// type
type TAuthCardVariant = 'login' | 'signup'

// interface
interface IProps {
  variant: TAuthCardVariant
}

// component
const AuthCardComponent: FC<Readonly<IProps>> = (props) => {
  const { variant } = props

  const translations = useTranslations('AuthPage.heading')

  // return
  return (
    <Card className='border-none py-6 pb-9 shadow-lg sm:max-w-lg sm:px-5'>
      <CardHeader className='gap-6'>
        <CardTitle className='mb-1.5 text-center text-xl sm:text-2xl'>
          {variant === 'login' ? translations('login') : translations('signup')}
        </CardTitle>
      </CardHeader>

      <CardContent>{variant === 'login' ? <LoginFormComponent /> : <SignupFormComponent />}</CardContent>
    </Card>
  )
}

export default AuthCardComponent
