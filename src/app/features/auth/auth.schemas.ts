import { z } from 'zod';

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('errors.emailRequired')),
    password: z.string().nonempty(t('errors.passwordRequired')),
  });

export const createSignupSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t('errors.nameRequired')),
      email: z.email(t('errors.emailRequired')),
      password: z.string().min(8, t('errors.passwordRequired')),
      confirmPassword: z.string().nonempty(t('errors.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.confirmPasswordMatch'),
      path: ['confirmPassword'],
    });

export type LoginSchemaData = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignupSchemaData = z.infer<ReturnType<typeof createSignupSchema>>;
