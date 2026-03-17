'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/app/shared/ui/button';
import { Input } from '@/app/shared/ui/input';
import { Label } from '@/app/shared/ui/label';
import { EyeOffIcon, EyeIcon } from 'lucide-react';

import { LoginSchema, type LoginSchemaData } from './auth.schemas';

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchemaData) => {
    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email */}
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

      {/* Password */}
      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          Password <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isVisible ? 'text' : 'password'}
            className="pr-9 "
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

      <div className="flex justify-center mt-10">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="w-full sm:w-1/2 uppercase font-medium cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};
