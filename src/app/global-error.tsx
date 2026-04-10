'use client'

import { type FC, useEffect } from 'react'

import { ErrorFallbackModule } from '@/app/modules/error-fallback'
import { type IErrorProps } from '@/app/shared/interfaces'

// type
type TProps = Required<IErrorProps>

// component
const Page: FC<Readonly<TProps>> = (props: TProps) => {
  const { error } = props

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  // return
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

export default Page
