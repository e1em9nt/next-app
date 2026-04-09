'use client'

import { type FC } from 'react'

import { useProductById } from '@/app/entities/api'
import { ProductCardComponent } from '@/app/features/product-card'

// interface
interface IProps {
  id: string
}

// component
const ProductModule: FC<Readonly<IProps>> = (props) => {
  const { id } = props

  const { data: product } = useProductById(id)

  if (!product) return null

  // return
  return (
    <main className='mx-8 my-4 flex min-h-[calc(100vh-64px)] items-center justify-center sm:mx-10 md:mx-14'>
      <div className='w-full lg:w-1/2 2xl:w-1/3'>
        <ProductCardComponent product={product} variant='detailed' />
      </div>
    </main>
  )
}

export default ProductModule
