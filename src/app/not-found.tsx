import { Metadata } from 'next'

import { NotFoundPage } from './modules/not-found'

export const metadata: Metadata = {
  title: 'Not Found | Products',
  description: 'The page you are looking for is not found, we suggest you back to home.',
}

export default function NotFound() {
  return (
    <html lang='en'>
      <body>
        <main>
          <NotFoundPage />
        </main>
      </body>
    </html>
  )
}