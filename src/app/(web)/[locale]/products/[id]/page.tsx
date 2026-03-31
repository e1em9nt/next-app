import { type Metadata, type NextPage } from 'next'
import { notFound } from 'next/navigation'

import { getProductById, productQueryOptions } from '@/app/entities/api'
import { ProductModule } from '@/app/modules/product'
import { getQueryClient } from '@/pkg/rest-api'

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

  const queryClient = getQueryClient()

  const product = await queryClient.fetchQuery(productQueryOptions(id))

  if (!product) notFound()

  // return
  return <ProductModule product={product} />
}

export default Page
