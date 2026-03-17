'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/app/shared/ui/button';
import { Input } from '@/app/shared/ui/input';
import { Label } from '@/app/shared/ui/label';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

import { SignupSchema, type SignupSchemaData } from './auth.schemas';
import { useAuthStore } from '@/app/shared/store';
import { useRouter } from '@/pkg/libraries/locale';

export const SignupForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { register: registerUser } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SignupSchemaData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupSchemaData) => {
    const result = await registerUser(data.name, data.email, data.password);
    if (result.success) {
      router.push('/products');
    } else {
      setError('root', { message: result.error });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-1">
        <Label htmlFor="username" className="leading-5">
          Username <span className="text-destructive">*</span>
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          {...register('name')}
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name && <p className="text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email" className="leading-5">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="name@example.com"
          {...register('email')}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && <p className="text-destructive">{errors.email.message}</p>}
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          Password <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isVisible ? 'text' : 'password'}
            className="pr-9"
            placeholder="Enter your password"
            {...register('password')}
            aria-invalid={errors.password ? true : undefined}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-1.5 right-1.5 rounded-l-none hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
          {errors.password && <p className="text-destructive">{errors.password.message}</p>}
        </div>
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="confirmPassword" className="leading-5">
          Confirm Password <span className="text-destructive">*</span>
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          className="pr-9"
          placeholder="Enter your password again"
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? true : undefined}
        />
        {errors.confirmPassword && (
          <p className="text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      {errors.root && <p className="text-destructive">{errors.root.message}</p>}

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="w-full sm:w-1/2 uppercase font-semibold cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </Button>
      </div>
    </form>
  );
};
