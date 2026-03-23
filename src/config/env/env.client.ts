import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url({ message: 'NEXT_PUBLIC_API_URL must be a valid URL' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
});