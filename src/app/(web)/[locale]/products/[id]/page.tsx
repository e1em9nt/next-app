import { notFound } from 'next/navigation'

import { getProductById } from '@/app/entities/api/products/products.api'
import { ProductCardComponent } from '@/app/features/product-card'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) notFound()

  return (
    <main className='mx-8 my-4 flex min-h-[calc(100vh-100px)] items-center justify-center sm:mx-10 md:mx-14'>
      <div className='w-full lg:w-1/2 2xl:w-1/3'>
        <ProductCardComponent product={product} variant='detailed' />
      </div>
    </main>
  )
}
