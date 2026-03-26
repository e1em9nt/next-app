import { notFound } from 'next/navigation'

import { getProductById } from '@/app/entities/api/products/products.api'
import { ProductModule } from '@/app/modules/product'

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

  return <ProductModule product={product} />
}
