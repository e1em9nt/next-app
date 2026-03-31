import { type Metadata, type NextPage } from 'next'
import { notFound } from 'next/navigation'

import { getProductById } from '@/app/entities/api/products/products.api'
import { ProductModule } from '@/app/modules/product'

// interface
interface IProps {
  params: Promise<{ id: string }>
}

// metadata
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { id } = await params

  const product = await getProductById(id)

  if (!product) notFound()

  return {
    title: product.title,
    description: product.description,
  }
}

// component
const Page: NextPage<Readonly<IProps>> = async (props) => {
  const { params } = props
  const { id } = await params

  const product = await getProductById(id)

  if (!product) notFound()

  // return
  return <ProductModule product={product} />
}

export default Page
