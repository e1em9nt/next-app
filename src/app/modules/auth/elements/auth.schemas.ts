import { z } from 'zod'

// sign in schema
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('errors.emailRequired')),
    password: z.string().nonempty(t('errors.passwordRequired')),
  })

// sign up schema
export const createSignupSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t('errors.nameRequired')).max(32, t('errors.nameTooLong')),
      email: z.email(t('errors.emailRequired')),
      password: z.string().min(8, t('errors.passwordRequired')),
      confirmPassword: z.string().nonempty(t('errors.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.confirmPasswordMatch'),
      path: ['confirmPassword'],
    })

// type
export type TLoginSchemaData = z.infer<ReturnType<typeof createLoginSchema>>
export type TSignupSchemaData = z.infer<ReturnType<typeof createSignupSchema>>
