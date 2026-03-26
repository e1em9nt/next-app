'use client'

import { ErrorFallbackModule } from '@/app/modules/error-fallback'

export default function GlobalError() {
  return (
    <html lang='en'>
      <body>
        <main>
          <ErrorFallbackModule />
        </main>
      </body>
    </html>
  )
}
