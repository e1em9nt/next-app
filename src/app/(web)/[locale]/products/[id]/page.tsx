import { type Metadata, type NextPage } from 'next'
import { notFound } from 'next/navigation'

import { getProductById, getTopProductIds, productQueryOptions } from '@/app/entities/api'
import { ProductModule } from '@/app/modules/product'
import { routing } from '@/pkg/locale'
import { getQueryClient } from '@/pkg/rest-api'

// revalidate
export const revalidate = 3600

// dynamic params
export const dynamicParams = true

// interface
interface IProps {
  params: Promise<{ id: string }>
}

// metadata
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { id } = await params

  const product = await getProductById(id)

  const brand = product?.brand ?? 'Product'

  if (!product) notFound()

  return {
    title: `${product.title} - ${brand}`,
    description: product.description,
  }
}

// static params
export async function generateStaticParams() {
  const topProductIds = await getTopProductIds()

  return routing.locales.flatMap((locale) => {
    return topProductIds.map((product) => ({
      locale,
      id: product.id.toString(),
    }))
  })
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
