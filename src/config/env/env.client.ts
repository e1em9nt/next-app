import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

const envClientParsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!envClientParsed.success) {
  throw new Error('Invalid environment variables');
}

export const envClient = envClientParsed.data;
