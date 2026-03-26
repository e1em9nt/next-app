import { notFound } from 'next/navigation'

import { getProductById } from '@/app/entities/api/products/products.api'
import { ProductModule } from '@/app/modules/product'

interface IProductDetailsProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: IProductDetailsProps) {
  const { id } = await params

  const product = await getProductById(id)

  if (!product) notFound()

  return {
    title: product.title,
    description: product.description,
  }
}

async function ProductDetails(props: IProductDetailsProps) {
  const { params } = props
  const { id } = await params

  const product = await getProductById(id)

  if (!product) notFound()

  return <ProductModule product={product} />
}

export default ProductDetails
