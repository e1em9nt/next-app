'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'

import { createSignupSchema, type TSignupSchemaData } from './auth.schemas'

// interface
interface IProps {}

// component
const SignupFormComponent: FC<Readonly<IProps>> = () => {
  const [isVisible, setIsVisible] = useState(false)

  const router = useRouter()

  const signup = useAuthStore((state) => state.register)

  const translations = useTranslations('SignupForm')
  const schema = createSignupSchema(translations)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TSignupSchemaData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSignupFormSubmit = async (data: TSignupSchemaData) => {
    const result = await signup(data.name, data.email, data.password)
    if (result.success) {
      router.push('/products')
    } else {
      setError('root', { message: translations(result.error!) })
    }
  }

  // return
  return (
    <form className='space-y-4' onSubmit={handleSubmit(handleSignupFormSubmit)} noValidate>
      <div className='space-y-1'>
        <Label htmlFor='username' className='leading-5'>
          {translations('name')} <span className='text-destructive'>*</span>
        </Label>

        <Input
          id='username'
          type='text'
          placeholder={translations('placeholder.name')}
          {...register('name')}
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name && <p className='text-destructive'>{errors.name.message}</p>}
      </div>

      <div className='space-y-1'>
        <Label htmlFor='email' className='leading-5'>
          {translations('email')} <span className='text-destructive'>*</span>
        </Label>

        <Input
          type='email'
          id='email'
          placeholder='name@example.com'
          {...register('email')}
          aria-invalid={errors.email ? true : undefined}
        />
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
            aria-invalid={errors.password ? true : undefined}
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

          {errors.password && <p className='text-destructive'>{errors.password.message}</p>}
        </div>
      </div>

      <div className='w-full space-y-1'>
        <Label htmlFor='confirmPassword' className='leading-5'>
          {translations('confirmPassword')} <span className='text-destructive'>*</span>
        </Label>

        <Input
          id='confirmPassword'
          type='password'
          className='pr-9'
          placeholder={translations('placeholder.confirmPassword')}
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? true : undefined}
        />

        {errors.confirmPassword && <p className='text-destructive'>{errors.confirmPassword.message}</p>}
      </div>

      {errors.root && <p className='text-destructive'>{errors.root.message}</p>}

      <div className='mt-8 flex justify-center'>
        <Button
          type='submit'
          disabled={isSubmitting || !isDirty}
          className='w-full cursor-pointer font-semibold uppercase disabled:cursor-not-allowed sm:w-1/2'
        >
          {isSubmitting ? translations('actions.signingUp') : translations('actions.signup')}
        </Button>
      </div>
    </form>
  )
}

export default SignupFormComponent
