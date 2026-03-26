import { Metadata } from 'next'

import { NotFoundModule } from '@/app/modules/not-found'

export const metadata: Metadata = {
  title: 'Not Found | Products',
  description: 'The page you are looking for is not found, we suggest you back to home.',
}

export default function NotFound() {
  return (
    <html lang='en'>
      <body>
        <main>
          <NotFoundModule />
        </main>
      </body>
    </html>
  )
}
