import ky, { type KyInstance } from 'ky'

import { envClient } from '@/config/env'

// fetchers
export const restApiFetcher: KyInstance = ky.create({
  prefix: `${envClient.NEXT_PUBLIC_API_URL}`,
  throwHttpErrors: false,
})
