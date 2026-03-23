'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'

import { createLoginSchema, type LoginSchemaData } from './auth.schemas'

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)

  const { login: loginUser } = useAuthStore()
  const router = useRouter()
  const translations = useTranslations('LogInForm')
  const schema = createLoginSchema(translations)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchemaData) => {
    const result = await loginUser(data.email, data.password)
    if (result.success) {
      router.push('/products')
    } else {
      setError('root', { message: translations(result.error!) })
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-1'>
        <Label htmlFor='email' className='leading-5'>
          {translations('email')} <span className='text-destructive'>*</span>
        </Label>
        <Input type='email' id='email' placeholder='name@example.com' {...register('email')} />
        {errors.email && <p className='text-destructive'>{errors.email.message}</p>}
      </div>

      <div className='w-full space-y-1'>
        <Label htmlFor='password' className='leading-5'>
          {translations('password')} <span className='text-destructive'>*</span>
        </Label>
        <div className='relative'>
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            className='pr-9'
            placeholder={translations('placeholder.password')}
            {...register('password')}
          />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible((prevState) => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-1.5 right-1.5 rounded-l-none hover:bg-transparent'
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>
              {isVisible ? translations('actions.hidePassword') : translations('actions.showPassword')}
            </span>
          </Button>
        </div>
        {errors.password && <p className='text-destructive'>{errors.password.message}</p>}
      </div>

      {errors.root && <p className='text-destructive'>{errors.root.message}</p>}

      <div className='mt-8 flex justify-center'>
        <Button
          type='submit'
          disabled={isSubmitting || !isDirty}
          className='w-full cursor-pointer font-medium uppercase disabled:cursor-not-allowed sm:w-1/2'
        >
          {isSubmitting ? translations('actions.loggingIn') : translations('actions.login')}
        </Button>
      </div>
    </form>
  )
}
