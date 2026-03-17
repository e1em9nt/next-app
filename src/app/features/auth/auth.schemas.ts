import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email({ message: 'Email is required' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

export const SignupSchema = z
  .object({
    name: z.string().min(2, { message: 'Name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().nonempty({ message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginSchemaData = z.infer<typeof LoginSchema>;
export type SignupSchemaData = z.infer<typeof SignupSchema>;
