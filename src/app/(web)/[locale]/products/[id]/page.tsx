import { type Metadata, type NextPage } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getProductById, getTopProductIds, productQueryOptions } from '@/app/entities/api'
import { ProductModule } from '@/app/modules/product'
import { type TLocale } from '@/app/shared/interfaces'
import { routing } from '@/pkg/locale'
import { getQueryClient } from '@/pkg/rest-api'

// revalidate
export const revalidate = 3600

// dynamic params
export const dynamicParams = true

// interface
interface IProps {
  params: Promise<TLocale & { id: string }>
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
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props
  const { locale, id } = await params

  setRequestLocale(locale)

  const queryClient = getQueryClient()

  await queryClient.fetchQuery(productQueryOptions(id))

  // return
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductModule id={id} />
    </HydrationBoundary>
  )
}

export default Page
