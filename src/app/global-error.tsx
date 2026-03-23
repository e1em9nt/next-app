'use client'

import { ErrorFallback } from '@/app/modules/error-fallback'

export default function GlobalError() {
  return (
    <html lang='en'>
      <body>
        <main>
          <ErrorFallback />
        </main>
      </body>
    </html>
  )
}
